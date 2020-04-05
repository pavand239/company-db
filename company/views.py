from django.shortcuts import render
from rest_framework import generics, viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Employee, Income, Education
from .serializers import *
from .permissions import *

from django.views.generic import TemplateView

class MainView(TemplateView):
    template_name = "index.html"

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    parser_classes = [MultiPartParser]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['surname', 'name','patronymic', 'department','position']
    filterset_fields=['gender','marital_status','attitude_to_conscription']
    def get_serializer_class(self):
        if self.action=='create':
            return EmployeeCreateSerializer
        else:
            if is_group_member(self.request, ['Chief'],):
                return EmployeeChiefSerializer
            elif is_group_member(self.request, ['Accounting']):
                return EmployeeAccountingSerializer
            elif is_group_member(self.request, ['HumanResource']):
                return EmployeeHumanResourceSerializer
            elif is_group_member(self.request, ['Admin']):
                return EmployeeAdminSerializer
            else:
                return EmployeeDefaultSerializer 
    def get_permissions(self):
        if self.action=='create' or self.action=='destroy':
            permission_classes = [is_group_member_perm(['HumanResource'])]
        elif self.action=='education':
            permission_classes=[is_group_member_perm(['Chief','Accounting','HumanResource','Admin'])]
        elif self.action=='income':
            permission_classes=[is_group_member_perm(['Chief','Accounting'])]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    @action(detail=True)
    def children(self,request, pk=None):
        children=Child.objects.filter(employee=pk)
        serializer=ChildSerializer(children,many=True)
        return Response(serializer.data)
    @action(detail=True)
    def education(self,request, pk=None):
        education=Education.objects.filter(employee=pk)
        serializer=EducationSerializer(education,many=True)
        return Response(serializer.data)
    @action(detail=True)
    def income(self,request, pk=None):
        income=Income.objects.filter(employee=pk)[:12]
        def get_serializer(self):
            if is_group_member(self.request,['Chief']):
                return IncomeChiefSerializer(income,many=True)
            elif is_group_member(self.request,['Accounting']):
                return IncomeAccountingSerializer(income,many=True)
        return Response(get_serializer(self).data)


    
        

    # def get_serializer_class_for_chief(self):
    #     return EmployeeChiefSerializer
    # def get_serializer_class_for_accounting(self):
    #     return EmployeeAccountingDepSerializer 

class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    def get_permissions(self):
        if self.action=='create' or self.action=='delete':
            permission_classes=[is_group_member_perm(['Accounting'])]
        else:
            permission_classes=[is_group_member_perm(['Chief','Accounting'])]
        return [permission() for permission in permission_classes]
    def get_serializer_class(self):
        if (self.request.user.groups.filter(name = 'Chief').exists()):
            return IncomeChiefSerializer
        elif (self.request.user.groups.filter(name = 'Accounting').exists()):
            return IncomeAccountingSerializer
    


class ChildViewSet(viewsets.ModelViewSet):
    serializer_class=ChildSerializer
    queryset = Child.objects.all()
    def get_permissions(self):
        if self.action=='create' or self.action=='destroy':
            permission_classes = [is_group_member_perm(['HumanResource', 'Admin'])]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    def get_permissions(self):
        if self.action=='create' or self.action=='destroy':
            permission_classes = [is_group_member_perm(['HumanResource', 'Admin'])]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    def get_serializer_class(self):
        if self.action=='create':
            return EducationCreateSerializer
        else:
            return EducationSerializer

class TaxRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer
    permission_classes = [is_group_member_perm(['Admin'])]


