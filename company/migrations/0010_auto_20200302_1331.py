# Generated by Django 3.0.3 on 2020-03-02 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0009_auto_20200226_0841'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='sex',
            new_name='gender',
        ),
    ]
