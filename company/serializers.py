from rest_framework import serializers
from .models import Employee, Education, Reward, Child, Income

class EmployeeDefaultSerializer(serializers.ModelSerializer):
    gender= serializers.CharField(source='get_gender_display')
    class Meta:
        model=Employee
        fields=['id','surname','name', 'patronymic','birth_date','birth_place','department','position','gender']
        read_only_fields=['id','surname','name', 'patronymic','birth_date','birth_place','department','position']

class EmployeeChiefSerializer(EmployeeDefaultSerializer):
    attitude_to_conscription = serializers.CharField(source='get_attitude_to_conscription_display')
    marital_status=serializers.CharField(source='get_marital_status_display')
    class Meta:
        model=Employee
        fields='__all__'
        read_only_fields=[
            "id","surname","name",
            "patronymic","birth_date","birth_place","gender",
            "department","attitude_to_conscription",
            "marital_status","passport_series","passport_ID","address","salary"
        ]
class EmployeeAccountingSerializer(EmployeeChiefSerializer):
    attitude_to_conscription = None
    marital_status = None
    class Meta:
        model=Employee
        exclude=["attitude_to_conscription","marital_status","address"]
class EmployeeHumanResourceSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        exclude=['salary']
class EmployeeAdminSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        exclude=["passport_series","passport_ID"]
        read_only_fields=["department","position"]
class EmployeeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields='__all__'

class IncomeChiefSerializer(serializers.ModelSerializer):
    class Meta:
        model=Income
        fields=['id','employee','income_date','percent','premium','tax','salary','total']
        read_only_fields=['id','employee','income_date','percent','tax','salary','total']
class IncomeAccountingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Income
        fields=['id','employee','income_date','percent','premium','tax','salary','total']
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
