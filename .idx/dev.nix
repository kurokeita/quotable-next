{ pkgs }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
    pkgs.pnpm
  ];
  idx.extensions = [
    "biomejs.biome"
    "bradlc.vscode-tailwindcss"
    "christian-kohler.npm-intellisense"
    "christian-kohler.path-intellisense"
    "codezombiech.gitignore"
    "davidanson.vscode-markdownlint"
    "donjayamanne.git-extension-pack"
    "eamodio.gitlens"
    "github.vscode-github-actions"
    "github.vscode-pull-request-github"
    "mikestead.dotenv"
    "oderwat.indent-rainbow"
    "pmneo.tsimporter"
    "steoates.autoimport"
    "stringham.move-ts"
    "tyriar.sort-lines"
    "vincaslt.highlight-matching-tag"
    "yzhang.markdown-all-in-one"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "sh"
          "-c"
          "pnpm i && pnpm dev --port $PORT --hostname 0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
