# Generated by Django 3.0.3 on 2020-03-02 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0011_auto_20200302_1548'),
    ]

    operations = [
        migrations.CreateModel(
            name='Taxes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='НДФЛ', max_length=50)),
                ('value', models.FloatField(default=0.13)),
            ],
        ),
        migrations.AlterField(
            model_name='income',
            name='tax',
            field=models.FloatField(),
        ),
    ]
