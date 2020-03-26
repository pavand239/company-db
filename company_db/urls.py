"""company_db URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from company.views import *
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'api/1.0/employee', EmployeeViewSet)
router.register(r'api/1.0/child', ChildViewSet)
router.register(r'api/1.0/education', EducationViewSet)
router.register(r'api/1.0/income', IncomeViewSet)

urlpatterns =router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('api/1.0/tax/<int:pk>/',TaxRetrieveUpdateView.as_view()),
    url(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
    # path('api/1.0/employee/', EmployeeListView.as_view(),name='employee-list'),
    # path('api/1.0/employee/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    # path('api/1.0/employee/<int:pk>/children', EmployeeChildListView.as_view(), name='employee-child-list'),
    # path('api/1.0/employee/<int:pk>/education', EmployeeEducationListView.as_view(), name='employee-education-list'),
    # path('api/1.0/employee/<int:pk>/income', EmployeeIncomeListView.as_view(), name='employee-income-list'),
    # path('api/1.0/income/', IncomeListView.as_view(), name='income-list'),
    # path('api/1.0/income/<int:pk>/', IncomeDetailView.as_view(), name='income-detail'),
    # path('api/1.0/child/', ChildListView.as_view(), name='child-list'),
    # path('api/1.0/child/<int:pk>/', ChildDetailView.as_view(), name='child-detail'),
    # path('api/1.0/education/', EducationListView.as_view(), name='education-list'),
    # path('api/1.0/education/<int:pk>/', EducationDetailView.as_view(), name='education-detail'),
]
