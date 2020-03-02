import datetime

from django.db import models
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
# Create your models here.

class Employee(models.Model):
    surname = models.CharField(max_length=100, verbose_name='Фамилия')
    name = models.CharField(max_length=100, verbose_name='Имя')
    patronymic = models.CharField(max_length=100, verbose_name='Отчество')
    birth_date = models.DateField(verbose_name='Дата рождения')
    birth_place = models.CharField(max_length=250)
    gender = models.CharField(max_length=1,
                            choices=[
                                ('m','Мужской'),
                                ('f','Женский')
                            ])
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    attitude_to_conscription = models.CharField(max_length=3,
                                                choices=[
                                                    ('pos','Позитивное'),
                                                    ('neu','Нейтральное'),
                                                    ('neg','Негати вное')
                                                ], default='neu')
    marital_status = models.CharField(max_length=1,
                            choices=[
                                ('y','Женат/Замужем'),
                                ('n','Не женат/не замужем')
                            ])
    passport_series=models.CharField(validators=[RegexValidator(regex='^\d{4}$', 
                                                                message='Серия паспорта - число из 4 цифр', 
                                                                code='nomatch')], 
                                    max_length=4)
    passport_ID=models.CharField(validators=[RegexValidator(regex='^\d{6}$', 
                                                                message='Номер паспорта - число из 6 цифр', 
                                                                code='nomatch')], 
                                    max_length=6)
    address = models.CharField(max_length=200)
    salary = models.FloatField(validators=[MinValueValidator(limit_value=0,message='Оклад не меньше 0')])

    def __str__(self):
        return '{} {}.{}.'.format(self.surname, self.name[0], self.patronymic[0])

class Education(models.Model):
    employee = models.ForeignKey('Employee', related_name='education', on_delete=models.CASCADE)
    edu_inst_name  = models.CharField(max_length=200)
    edu_inst_address  = models.CharField(max_length=200)
    edu_type = models.CharField(max_length=3,
                                choices=[
                                    ('pt','Заочная'),
                                    ('ft','Очная')
                                ], default='ft')
    admission_year = models.IntegerField(validators=[
            MaxValueValidator(limit_value=datetime.date.today().year,
                            message='Дата поступления не может быть в будущем'),
            MinValueValidator(limit_value=1900,
                            message='Минимальная дата поступления - 1900 год')
        ])
    graduate_year = models.IntegerField(validators=[
            MaxValueValidator(limit_value=datetime.date.today().year,
                              message='Дата окончания не может быть в будущем'),
            MinValueValidator(limit_value=1900,
                              message='Минимальная дата окончания - 1900 год')
        ],
        blank=True,
        null=True)
    speciality_name = models.CharField(max_length=100, blank=True)
    diploma_num = models.CharField(max_length=25, unique=True, blank=True) 
    degree = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return '{} {}'.format(self.employee, self.edu_inst_name)

class Reward(models.Model):
    employee = models.ForeignKey('Employee', related_name='reward', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    award_date = models.DateField()

    def __str__(self):
        return '{} {} {}'.format(self.employee, self.name, self.award_date.year)

class Child(models.Model):
    employee = models.ManyToManyField('Employee',related_name='children',)
    surname = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100)
    birth_date = models.DateField()
    def __str__(self):
        return '{} {} {}'.format(self.surname, self.name, self.patronymic)



class Income(models.Model):
    tax = models.FloatField()
    employee = models.ForeignKey('Employee', related_name='income', on_delete=models.CASCADE)
    percent = models.DecimalField(max_digits=3, decimal_places=2,
                                default=0,
                                validators=[
                                        MaxValueValidator(limit_value=1,
                                                        message='Максимальное значение 1'),
                                        MinValueValidator(limit_value=-0.5,
                                                        message='Минимальное значение -0.5')
                                    ])
    premium = models.FloatField(default=0, 
                                validators=[MinValueValidator(limit_value=0,message='Премия не меньше 0')])
    income_date = models.DateField()
    salary = models.FloatField()
    total = models.FloatField()
    def __str__(self):
        return '{} {}.{} Сумма: {}'.format(self.employee, self.income_date.month, self.income_date.year, self.get_total)

    @property
    def get_salary(self):
        return self.employee.salary
    @property
    def get_tax(self):
        return Taxes.objects.get(name='НДФЛ').value
    @property
    def get_total(self):
        return (self.salary+self.salary*float(self.percent)+self.premium)*(1-self.tax)

    def save(self, *args, **kwargs):
        if not self.salary:
            self.salary=self.get_salary
        if not self.tax:
            self.tax=self.get_tax
        if not self.total:
            self.total=self.get_total
        super(Income, self).save(*args, **kwargs)

class Taxes(models.Model):
    name=models.CharField(default='НДФЛ',max_length=50)
    value=models.FloatField(default=0.13)
    def __str__(self):
        return self.name





    





