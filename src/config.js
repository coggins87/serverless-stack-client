export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_mTDjb81w361titAXGngxhXWB00nPbfe0nk",
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
    IDENTITY_POOL_ID: "us-east-2:59f7cd80-01fe-4da1-ac45-f5d2f89d66c0"
  }
}