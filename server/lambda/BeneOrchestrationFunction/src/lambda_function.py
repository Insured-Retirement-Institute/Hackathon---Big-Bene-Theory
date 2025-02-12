import json
import boto3
import urllib3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CarrierLookup')

def lambda_handler(event, context):
    print('event ==', event)
    print('query param strings:',event['queryStringParameters'])
    print('context ==', context)
    customerId = event.get('customerId')
    print('customerId ==', customerId)
    response = table.get_item(Key={'customerId': customerId})
    print('res ==', response)        
    item = response.get('Item')
    print ('item ==', item)
    payload = {}
    policyNumber = ''
    if item:
        policyNumber = item['policyNumber']
        print('policyNumber ==', policyNumber)
        payload = {'policyNumber': policyNumber,'customerId': customerId,'eventType': 'GET'}
    result = []

    if(item['carrier']=='carrierX'):
        http = urllib3.PoolManager()
        result = http.request('GET',
                        'https://bf20nuey1l.execute-api.us-east-1.amazonaws.com/Dev/beneficiaries',
                        body = json.dumps(payload),
                        headers = {'Content-Type': 'application/json'})
        print('Result => ', result.data)
        data = json.loads(result.data)
        print(data)
        
    if result:
        return json.loads(result.data)
    else:
        return {
            'statusCode': 404,
            'body': json.loads('{ "message": "Beneficiary not found" }')
        }
    return {
        'statusCode': 200,
        'body': json.loads('{ "message": "Server side error" }')
    }
