#!/bin/bash

npx vercel pull --yes --environment=production --token $VERCEL_TOKEN
npx vercel build --prod --token $VERCEL_TOKEN
vercel deploy --prebuilt --prod --token $VERCEL_TOKEN

