import json
import boto3
import urllib3


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CarrierLookup')

def lambda_handler(event, context):
    print('event ==', event)
    print('context ==', context)
    customerId = event['customerId']
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
    responsePolicy= []
    if(item['carrier']=='carrierX'):
        http = urllib3.PoolManager()
        result = http.request('GET',
                        'https://bf20nuey1l.execute-api.us-east-1.amazonaws.com/Dev/beneficiaries',
                        body = json.dumps(payload),
                        headers = {'Content-Type': 'application/json'})
        print('Result = ', json.loads(result.data))
        data = json.loads(result.data)['body']
        for key, value in data.items():
            print(key, value)

        responsePolicy= []
        Policy = {}
        Policy['beneficiaries'] = data['Beneficiary']
        Policy['owner'] = data['owner']
        Policy['policyNumber'] = data['policy'][0]['policyNumber']
        Policy['carrier'] = data['policy'][0]['carrier']
        Policy['firm'] = data['policy'][0]['firm']
        Policy['accountValue'] = data['policy'][0]['accountValue']
        Policy['productCategory'] = data['policy'][0]['productCategory']
        Policy['financialAdvisor'] = data['policy'][0]['financialAdvisor']
        Policy['productName'] = data['policy'][0]['productName']
        responsePolicy.append(Policy)
        



        
    if responsePolicy:
        return responsePolicy
    else:
        return {
            'statusCode': 404,
            'body': json.loads('{ "message": "Beneficiary not found" }')
        }
    return {
        'statusCode': 200,
        'body': json.loads('{ "message": "Server side error" }')
    }
