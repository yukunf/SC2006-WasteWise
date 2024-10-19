# admin.py
from django.contrib import admin
import requests

from .models import Collector


@admin.action(description='Update All Collectors from gov.sg')
def update_collectors_from_source(modeladmin, request, queryset):
    try:

            appendix = "/api/action/datastore_search?resource_id=d_26afdd562f28b4acecb400c10b70f013"
            url = "https://data.gov.sg"
            all_records = []
            while url:
                reqURL = url + appendix
                response = requests.get(reqURL)
                data = response.json()
                if response.status_code == 200 and data['success'] is True:

                    records = data['result']['records']
                    appendix = data['result']['_links']['next']
                    all_records.extend(records)
                    print(f"Fetching data: current entry count: {records[-1]["_id"]}")
                    if records[-1]["_id"] == data['result']['total']:
                        print("All data fetched successfully")
                        break
                else:
                    modeladmin.message_user(request, "Failed to update", level='error')




            for item in all_records:
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

    except Exception as e:
        modeladmin.message_user(request, f"An Error Occurred When Trying to Update Data: {str(e)}", level='error')


@admin.register(Collector)
class CollectorAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'phone', 'fax']
    search_fields = ['name', 'licences']
    list_filter = ['licences']
    actions = [update_collectors_from_source]
