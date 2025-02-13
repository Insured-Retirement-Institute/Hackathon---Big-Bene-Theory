import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
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

        policyList = []

        #check if the Customer Policies was found
        if CarrierYPolicies["Count"] > 0:
            if 'customerId' in CarrierYPolicies["Items"][0]:
                userYPolicy = CarrierYPolicies["Items"][0]["policyNumber"]
                policyList.append(userYPolicy)
        if CarrierXPolicies["Count"] > 0:
            if 'customerId' in CarrierXPolicies["Items"][0]:
                userXPolicy = CarrierXPolicies["Items"][0]["policyNumber"]
                policyList.append(userXPolicy) 


        # Perform a scan operation to find items where 'policyNumber' matches
        notificationTable = dynamodb.Table("CarrierNotification")  
        notificationResponse = notificationTable.scan(
                ProjectionExpression="NotificationID",
                FilterExpression=Attr("policyNumber").is_in(policyList)
        )
        notificationCount = notificationResponse["Count"]

        keysToDelete = []

        for i in range(notificationCount):
            notificationId = notificationResponse["Items"][i]["NotificationID"]
            value=f"{notificationId}"
            keysToDelete.append({"NotificationID":int(value)})

        if keysToDelete:
            with notificationTable.batch_writer() as batch:
                for key in keysToDelete:
                    batch.delete_item(Key=key)
        
        return {
           'statusCode': 200,
           'body': json.dumps(f"Successfully deleted")
        }

    except ClientError as e:
        # Handle any errors that occur during the call
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error fetching item: {e}")
        }
