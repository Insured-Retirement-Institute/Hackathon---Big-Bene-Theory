import json
import urllib3


def lambda_handler(event, context):
    print('event ==', event)
    print(event['policies'])
    policies = event['policies']
    index = 0
    for policy in policies:
        payload = {}
        print('beneficiaries ==', policy['beneficiaries'])
        for beneficiary in policy['beneficiaries']:
            beneficiary['eventType'] ="UPDATE"
            beneficiary['policyNumber'] = policy['policyNumber']
            print('beneficiary ==', beneficiary)
            http = urllib3.PoolManager()
            result = http.request('POST',
                        'https://bf20nuey1l.execute-api.us-east-1.amazonaws.com/Dev/beneficiaries',
                        body = json.dumps(beneficiary),
                        headers = {'Content-Type': 'application/json'})
            print('Response = ', json.loads(result.data))
            response = json.loads(result.data)
            if response['statusCode'] == 200:
                index += 1

    print('index ==', index)
    print('policies ==',policies)
    if index == len(policy['beneficiaries']):
        return {
            'statusCode': 200,
            'body': json.dumps({'success':'Update successful'})
        }

    else:
        return {
            'statusCode': 500,
            'body': json.dumps({'Failure':'some or all updates failed'})
        }

    


