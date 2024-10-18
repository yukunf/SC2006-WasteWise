# admin.py
from django.contrib import admin
import requests

from .models import Collector


@admin.action(description='Update All Collectors from gov.sg')
def update_collectors_from_source(modeladmin, request, queryset):
    try:
        datasetId = "d_26afdd562f28b4acecb400c10b70f013"
        url = "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId
        response = requests.get(url)
        data = response.json()

        print(f"Getting data: {data['success']}")

        if response.status_code == 200 and data['success'] is True:
            result_data = data['result']
            for item in result_data['records']:
                # Update or Create Collector
                Collector.objects.update_or_create(
                    name=item['company_name'],
                    defaults={
                        'address': item['company_address'],
                        'phone': '' if item['telephone_no'] == 'na' else item['telephone_no'],
                        'fax': '' if item['fax_no'] == 'na' else item['fax_no'],
                        'licences': item['class_of_licence'],
                    }
                )
            modeladmin.message_user(request, "Collectors are now up to date")
        else:
            modeladmin.message_user(request, "Failed to update", level='error')
    except Exception as e:
        modeladmin.message_user(request, f"An Error Occurred When Trying to Update Data: {str(e)}", level='error')


@admin.register(Collector)
class CollectorAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'phone', 'fax']
    search_fields = ['name', 'licences']
    list_filter = ['licences']
    actions = [update_collectors_from_source]
