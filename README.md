# CodeReview BOT


## Using Github Actions

[actions/chatgpt-codereviewer](https://github.com/marketplace/actions/chatgpt-codereviewer)

1. add the `AZURE_OPENAI_API_KEY` to your github actions secrets
2. create `.github/workflows/cr.yml` add bellow content

```yml
code-review:
  runs-on: ubuntu-latest
  permissions:
    pull-requests: write
    contents: read
  steps:
    - name: Azure OpenAI CodeReviewer
      uses: stanlee000/ChatGPT-CodeReview@0.0.1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        AZURE_OPENAI_API_KEY: ${{ secrets.AZURE_OPENAI_API_KEY }}
        AZURE_API_ENDPOINT: https://openai-northus-region.openai.azure.com/
        AZURE_OPENAI_DEPLOYMENT_NAME: gpt4-turbo
        AZURE_OPENAI_API_VERSION: 2023-09-15-preview
        # Optional
        AZURE_OPENAI_API_ASSISTANT_INSTRUCTION: # example: Please check if there are any confusions or irregularities in the following code diff:
        top_p: 1 # https://platform.openai.com/docs/api-reference/chat/create#chat/create-top_p
        temperature: 1 # https://platform.openai.com/docs/api-reference/chat/create#chat/create-temperature
        max_tokens: 10000
        MAX_PATCH_LENGTH: 10000 # if the patch/diff length is large than MAX_PATCH_LENGTH, will be ignored and won't review. By default, with no MAX_PATCH_LENGTH set, there is also no limit for the patch/diff length.
```

## Credit

this project is inpired by [codereview.gpt](https://github.com/sturdy-dev/codereview.gpt)

## License

[ISC](LICENSE) © 2023 anc95
