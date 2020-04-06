from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Employee, Education, Reward, Child, Income, Tax

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            User._meta.pk.name,
            User.USERNAME_FIELD,
            'groups'
        )
        read_only_fields = (User.USERNAME_FIELD,)

class EmployeeDefaultSerializer(serializers.ModelSerializer):
    gender= serializers.CharField(source='get_gender_display')
    class Meta:
        model=Employee
        fields=['id','surname','name', 'patronymic','birth_date','birth_place','department','position','gender', 'photo']
        read_only_fields=['id','surname','name', 'patronymic','birth_date','birth_place','department','position', 'photo']

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
            "marital_status","passport_series","passport_ID","address","salary", 'photo'
        ]
class EmployeeAccountingSerializer(EmployeeChiefSerializer):
    attitude_to_conscription = None
    marital_status = None
    class Meta:
        model=Employee
        exclude=["attitude_to_conscription","marital_status","address"]
        read_only_fields = ["id","surname","name",
            "patronymic","birth_date","birth_place","gender",
            "department","position","passport_series","passport_ID",'photo'
        ]
class EmployeeHumanResourceSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        exclude=['salary']
class EmployeeAdminSerializer(EmployeeChiefSerializer):
    class Meta:
        model=Employee
        exclude=["passport_series","passport_ID"]
        read_only_fields=["department","position"]

class EmployeeUnionSerializer(EmployeeDefaultSerializer):
    gender= serializers.CharField(source='get_gender_display')
    presents_num=serializers.IntegerField()
    class Meta:
        model=Employee
        fields=['id','surname','name', 'patronymic','birth_date','birth_place','department','position','gender', 'photo', 'presents_num']
        read_only_fields=['id','surname','name', 'patronymic','birth_date','birth_place','department','position', 'photo', 'presents_num']

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
        read_only_fields=['premium','salary','total', 'tax']

        
class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model=Child
        fields='__all__'


class EducationCreateSerializer(serializers.ModelSerializer):
    graduate_year = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    admission_year = serializers.CharField(required=True)
    def validate_graduate_year(self, value):
        if not value:
            return None
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError('You must supply an integer')
    def validate_admission_year(self, value):
        if not value:
            return None
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError('You must supply an integer')
    class Meta:
        model=Education
        fields='__all__'
        
class EducationSerializer(EducationCreateSerializer):
    edu_type=serializers.CharField(source='get_edu_type_display')
    class Meta:
        model=Education
        fields='__all__'

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tax
        fields='__all__'