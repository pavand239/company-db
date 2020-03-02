from rest_framework import serializers
from .models import Employee, Education, Reward, Child, Income

class EmployeeDefaultSerializer(serializers.ModelSerializer):
    sex= serializers.CharField(source='get_sex_display')
    class Meta:
        model=Employee
        fields=['id','surname','name', 'patronymic','birth_date','department','position','sex']
        read_only_fields=['id','surname','name', 'patronymic','birth_date','department','position']

class EmployeeChiefSerializer(EmployeeDefaultSerializer):
    attitude_to_conscription = serializers.CharField(source='get_attitude_to_conscription_display')
    marital_status=serializers.CharField(source='get_marital_status_display')
    class Meta:
        model=Employee
        fields='__all__'
        read_only_fields=[
            "id","surname","name",
            "patronymic","birth_date","birth_place","sex",
            "department","attitude_to_conscription",
            "marital_status","passport_series","passport_ID","address","salary"
        ]
class EmployeeAccountingSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        exclude=["attitude_to_conscription","marital_status",
                 "passport_series","passport_ID","address"]
class EmployeeHumanResourceSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        fields='__all__'
class EmployeeAdminSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        exclude=["passport_series","passport_ID"]
        read_only_fields=["department","position"]

class IncomeChiefSerializer(serializers.ModelSerializer):
    class Meta:
        model=Income
        fields='__all__'
        read_only_fields=['id','employee','income_date','percent','tax','salary','get_total']
class IncomeAccountingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Income
        fields='__all__'
        read_only_fields=['premium','salary','get_total']

        
class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model=Child
        fields='__all__'

class EducationSerializer(serializers.ModelSerializer):
    edu_type=serializers.CharField(source='get_edu_type_display')
    class Meta:
        model=Education
        fields='__all__'
