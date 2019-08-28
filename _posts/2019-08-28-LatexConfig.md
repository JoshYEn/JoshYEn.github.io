---
layout: post
title: "在 macOS 上配置 LaTeX"
date: 2019-08-28 13:15:00 +0200
categories: coding
---
# 在 macOS 上使用 LaTeX

想想当初，最早在 MAC 上编辑 LaTeX 时使用的环境是 Atom。彼时 VS Code 刚刚起步，没有什么像样的包，Atom可以说是最优雅的方式了。后来随着 JamesYu 大佬转去开发 VS Code 上的 `LaTeX-Workshop`…… 到现在 `LaTeX-Workshop` 已经更新到了 `8.0.7` 版本。真是时过境迁。。。

## Prerequisites

- MacTex 2019
- 更新 MacTex
- VS Code
  - LaTeX Workshop
  - LaTeX Utilities (extra features)
  
## 中文支持

LaTeX 默认使用 `latexmk`、`pdflatex` 和 `bibtex` 作为编译工具。需要更改 tools 和相应的 recipes 来完成工作流。
