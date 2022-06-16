const config = {
  // Backend config
  STAGE: (process.env.NEXT_PUBLIC_STAGE ?? "").startsWith("{{")
    ? ""
    : process.env.NEXT_PUBLIC_STAGE,
  apiGateway: {
    REGION: (process.env.NEXT_PUBLIC_REGION ?? "").startsWith("{{")
      ? ""
      : process.env.NEXT_PUBLIC_REGION,
    URL: (process.env.NEXT_PUBLIC_API_URL ?? "").startsWith("{{")
      ? ""
      : process.env.NEXT_PUBLIC_API_URL,
  },
  cognito: {
    REGION: (process.env.NEXT_PUBLIC_REGION ?? "").startsWith("{{")
      ? ""
      : process.env.NEXT_PUBLIC_REGION,
    USER_POOL_ID: (process.env.NEXT_PUBLIC_USER_POOL_ID ?? "").startsWith("{{")
      ? ""
      : process.env.NEXT_PUBLIC_USER_POOL_ID,
    APP_CLIENT_ID: (
      process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID ?? ""
    ).startsWith("{{")
      ? ""
      : process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: (
      process.env.NEXT_PUBLIC_IDENTITY_POOL_ID ?? ""
    ).startsWith("{{")
      ? ""
      : process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    OAUTH_DOMAIN: (process.env.NEXT_PUBLIC_COGNITO_DOMAIN ?? "").startsWith(
      "{{"
    )
      ? ""
      : process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
  },
};

export default config;
