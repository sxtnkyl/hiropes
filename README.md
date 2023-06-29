# HiRopes 2023

## Hiropes Boulder Buddy

This app is a rock climbing tool for providing a structured 2-hour interval workout routine, documenting and visualizing progress, and maximizing gym time efficiency.

It is currently designed for use at the gym, and thus, mobile size screens.

---

## Tech Goals

Apply enterprise level infrastructure and coding standards which include:

- prod/dev pipelines and releases
- commit linting and feature branch merging review standards
- build/type/test safety
- scalable code practices

---

## Utilities

- AWS Amplify
- Nextjs
- GraphQL
- Material-UI
- Typescript
- Formik
- ESlint
- Prettier
- Husky
- Yup
- Jest/RTL

---

### Config References

Lint/Formatting

- https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
- https://prettier.io/docs/en/options.html

Branch Strategy

- main and dev amplify hosting piplines
- feature branch off dev, features back into dev
- release branch off dev, merge to main and dev
- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

Auth Theming

- due to mui theming, customizing amplify-ui auth flow with MUI components means larger effort, currently outweighing time vs benefit
- will need to build out custom components/hooks for auth state and replace withAuthenticator hook in App
- https://github.com/aws-amplify/amplify-ui/tree/main
- https://github.com/hupe1980/amplify-material-ui/tree/master
- https://ui.docs.amplify.aws/react/guides/auth-protected#setting-up-the-authenticator
