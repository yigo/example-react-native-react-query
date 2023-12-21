// posthog.ts
import PostHog from 'posthog-react-native'

export let posthog: PostHog | undefined = undefined
export const APIKEY = ""; // add api key here
export const PROJECTID = ""; // add project id here
export const posthogAsync: Promise<PostHog> = PostHog.initAsync(APIKEY, {
  host: "https://app.posthog.com" // This is https://app.posthog.com by default
})

posthogAsync.then(client => {
  posthog = client
})