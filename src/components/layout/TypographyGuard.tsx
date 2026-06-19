"use client"

import { useEffect } from "react"

const shortWords =
  "а|без|бы|в|во|для|до|же|за|и|из|к|как|ко|ли|на|над|не|но|о|об|от|по|под|при|про|с|со|у"

const shortWordPattern = new RegExp(
  `(^|[\\s([{«„"—–-])(${shortWords})\\s+(?=[А-ЯЁа-яё])`,
  "giu"
)

const ignoredParentSelector =
  "script, style, code, pre, textarea, input, select, option, svg, [contenteditable='true'], [data-typography='off']"

function addNonBreakingSpaces(value: string) {
  let result = value

  for (let pass = 0; pass < 3; pass += 1) {
    const next = result.replace(shortWordPattern, "$1$2\u00A0")

    if (next === result) {
      break
    }

    result = next
  }

  return result
}

function processTextNodes(root: Node) {
  const processTextNode = (node: Text) => {
    const parent = node.parentElement

    if (
      !parent ||
      parent.closest(ignoredParentSelector) ||
      !node.nodeValue?.trim()
    ) {
      return
    }

    const current = node.nodeValue
    const formatted = addNonBreakingSpaces(current)

    if (formatted !== current) {
      node.nodeValue = formatted
    }
  }

  if (root.nodeType === Node.TEXT_NODE) {
    processTextNode(root as Text)
    return
  }

  const documentRoot =
    root.nodeType === Node.DOCUMENT_NODE
      ? (root as Document)
      : root.ownerDocument

  if (!documentRoot) {
    return
  }

  const walker = documentRoot.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement

        if (
          !parent ||
          parent.closest(ignoredParentSelector) ||
          !node.nodeValue?.trim()
        ) {
          return NodeFilter.FILTER_REJECT
        }

        return NodeFilter.FILTER_ACCEPT
      },
    }
  )

  const nodes: Text[] = []

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text)
  }

  nodes.forEach(processTextNode)
}

export default function TypographyGuard() {
  useEffect(() => {
    processTextNodes(document.body)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === Node.TEXT_NODE ||
            node.nodeType === Node.ELEMENT_NODE
          ) {
            processTextNodes(node)
          }
        })

        if (mutation.type === "characterData") {
          processTextNodes(mutation.target)
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
