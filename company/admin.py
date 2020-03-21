from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    pass

@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    pass

@admin.register(Child)
class ChildAdmin(admin.ModelAdmin):
    pass

@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    # pass
    fieldsets = (
        (None, {
            'fields': (
                'employee', 'tax', 'salary', 'percent','premium','income_date','total',
            ),
        }),
    )
    readonly_fields=('salary','total', 'tax')

@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    pass