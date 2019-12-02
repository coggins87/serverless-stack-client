export default {
  s3: {
    REGION: "us-west-1",
    BUCKET: "colleen-note-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://wvn02tc7h7.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_R33mZD5S2",
    APP_CLIENT_ID: "7v0qoqedd3be3ak394a71qgre0",
    IDENTITY_POOL_ID: " us-east-2:5c41cbe6-8f53-4430-9622-e2d7c7ad030b"
  }
}