import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Assuming the primary key is 'id' and we are passing 'id' in the event
    customerId = event.get('customerId')

    if not customerId:
        return {
            'statusCode': 400,
            'body': json.dumps('Missing "customerId" parameter')
        }
    
    try:
        CarrierYTable = dynamodb.Table("CarrierYPolicyDetails")
        CarrierYPolicies = CarrierYTable.scan(
                FilterExpression=Key("customerId").eq(customerId)
        )

        CarrierXTable = dynamodb.Table("CarrierXPolicyDetails")
        CarrierXPolicies = CarrierXTable.scan(
                FilterExpression=Key("customerId").eq(customerId)
        )
        carrierYCount = CarrierYPolicies["Count"]
        carrierXCount = CarrierXPolicies["Count"]
        policyList = []
        #check if the Customer Policies was found
        for i in range(carrierYCount):
            if 'customerId' in CarrierYPolicies["Items"][i]:
                userYPolicy = CarrierYPolicies["Items"][i]["policyNumber"]
                policyList.append(userYPolicy)

        for i in range(carrierXCount):
            if 'customerId' in CarrierXPolicies["Items"][i]:
                userXPolicy = CarrierXPolicies["Items"][i]["policyNumber"]
                policyList.append(userXPolicy)
        print(policyList)

        # Perform a scan operation to find items where 'policyNumber' matches
        notificationTable = dynamodb.Table("CarrierNotification")  
        notificationResponse = notificationTable.scan(
                FilterExpression=Attr("policyNumber").is_in(policyList)
        )
        notificationCount = notificationResponse["Count"]
        print(notificationResponse["Items"])

        finalMessage =[]

        for i in range(notificationCount):
            Message = notificationResponse["Items"][i]["Message"]
            responsePolicyNumber = notificationResponse["Items"][i]["policyNumber"]
            #finalMessage = finalMessage + " " + Message + responsePolicyNumber
            finalMessage.append(Message + " " + responsePolicyNumber)

        #Message = notificationResponse["Items"][0]["Message"]
        #responsePolicyNumber = notificationResponse["Items"][0]["policyNumber"]

        return {
           'statusCode': 200,
           'body': json.dumps(f'{finalMessage}')
        }
        

    except ClientError as e:
        # Handle any errors that occur during the call
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error fetching item: {e}")
        }