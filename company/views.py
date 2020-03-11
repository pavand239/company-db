from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Employee, Income, Education
from .serializers import *
from .permissions import *

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
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
            else:
                return EmployeeDefaultSerializer 

    @action(detail=True)
    def get_children(self,request, pk=None):
        children=Child.objects.filter(employee=pk)
        serializer=ChildSerializer(children,many=True)
        return Response(serializer.data)
    @action(detail=True,
            permission_classes=[is_group_member_perm(['Chief','Accounting','HumanResource','Admin'])])
    def get_education(self,request, pk=None):
        education=Education.objects.filter(employee=pk)
        serializer=EducationSerializer(education,many=True)
        return Response(serializer.data)
    @action(detail=True, 
            permission_classes=[is_group_member_perm(['Chief','Accounting'])])
    def get_income_all(self,request, pk=None):
        income=Income.objects.filter(employee=pk)
        def get_serializer(self):
            if (self.request.user.groups.filter(name = 'Chief').exists()):
                return IncomeChiefSerializer(income,many=True)
            elif (self.request.user.groups.filter(name = 'Accounting').exists()):
                return IncomeAccountingSerializer(income,many=True)
        return Response(get_serializer(self).data)
    @action(detail=True, 
            permission_classes=[is_group_member_perm(['Chief','Accounting'])])
    def get_income_last_year(self,request, pk=None):
        income=Income.objects.filter(employee=pk)[:12]
        def get_serializer(self):
            if (self.request.user.groups.filter(name = 'Chief').exists()):
                return IncomeChiefSerializer(income,many=True)
            elif (self.request.user.groups.filter(name = 'Accounting').exists()):
                return IncomeAccountingSerializer(income,many=True)
        return Response(get_serializer(self).data)


    
        

    # def get_serializer_class_for_chief(self):
    #     return EmployeeChiefSerializer
    # def get_serializer_class_for_accounting(self):
    #     return EmployeeAccountingDepSerializer 

class IncomeViewSet(viewsets.ModelViewSet):
    permission_classes=[is_group_member_perm(['Chief','Accounting'])]
    def get_serializer_class(self):
        if (self.request.user.groups.filter(name = 'Chief').exists()):
            return IncomeChiefSerializer
        elif (self.request.user.groups.filter(name = 'Accounting').exists()):
            return IncomeAccountingSerializer
    queryset = Income.objects.all()


class ChildViewSet(viewsets.ModelViewSet):
    serializer_class=ChildSerializer
    queryset = Child.objects.all()

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class=EducationSerializer
    queryset = Education.objects.all()



