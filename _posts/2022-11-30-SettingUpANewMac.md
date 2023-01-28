---
layout: post
title: "设置新 Mac"
toc: true
date: 2022-11-30 20:00:00 +0800
categories: mac
---

## HomeBrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Formulae

```shell
# For Ruby & Jekyll
brew install chruby ruby-install

# Render
brew install povray

# Required by zotero
brew install pdftk-java
```



### Casks

```shell
brew install --cask iterm2

brew install --cask fig
brew install --cask iina
brew install --cask mactex
brew install --cask mos
brew install --cask paraview
brew install --cask transmission
brew install --cask webplotdigitizer
brew install --cask zerotier-one
```



## Others

### Node and nvm

> [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
>
> To **install** or **update** nvm, you should run the [install script](https://github.com/nvm-sh/nvm/blob/v0.39.2/install.sh). To do that, you may either download and run the script manually.

```shell
nvm use 16
```



### VIM

> [freeCodeCamp](https://www.freecodecamp.org/news/vimrc-configuration-guide-customize-your-vim-editor/)

**.vimrc**

```shell
" Disable compatibility with vi which can cause unexpected issues.
set nocompatible

" Enable type file detection. Vim will be able to try to detect the type of file in use.
filetype on

" Enable plugins and load plugin for the detected file type.
filetype plugin on

" Load an indent file for the detected file type.
filetype indent on

" Turn syntax highlighting on.
syntax on

" Set shift width to 4 spaces.
set shiftwidth=4

" Set tab width to 4 columns.
set tabstop=4

" While searching though a file incrementally highlight matching characters as you type.
set incsearch

" Ignore capital letters during search.
set ignorecase

" Override the ignorecase option if searching for capital letters.
" This will allow you to search specifically for capital letters.
set smartcase

" Use highlighting when doing a search.
set hlsearch
```

