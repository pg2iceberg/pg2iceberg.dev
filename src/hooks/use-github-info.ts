import { useEffect, useState, useSyncExternalStore } from "react";

interface GitHubInfo {
  stars: number | null;
  tag: string | null;
}

let data: GitHubInfo = { stars: null, tag: null };
let listeners: Array<() => void> = [];
let fetched = false;

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return data;
}

function update(partial: Partial<GitHubInfo>) {
  data = { ...data, ...partial };
  listeners.forEach((l) => l());
}

function fetchData() {
  if (fetched) return;
  fetched = true;

  fetch("https://api.github.com/repos/pg2iceberg/pg2iceberg")
    .then((res) => res.json())
    .then((d) => {
      if (typeof d.stargazers_count === "number") {
        update({ stars: d.stargazers_count });
      }
    })
    .catch(() => {});

  fetch("https://api.github.com/repos/pg2iceberg/pg2iceberg/tags?per_page=1")
    .then((res) => res.json())
    .then((d) => {
      if (Array.isArray(d) && d.length > 0) {
        update({ tag: d[0].name });
      }
    })
    .catch(() => {});
}

export function useGitHubInfo() {
  useEffect(fetchData, []);
  return useSyncExternalStore(subscribe, getSnapshot);
}
