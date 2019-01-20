import Vue from "vue"

export function host(url: string) {
  const hostName = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
  const parts = hostName.split(".").slice(-3)
  if (parts[0] === "www") parts.shift()
  return parts.join(".")
}

export function timeAgo(time: number | Date | undefined) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute")
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour")
  } else {
    return pluralize(~~(between / 86400), " day")
  }
}

function pluralize(time: number, label: string) {
  if (time === 1) {
    return time + label
  }
  return time + label + "s"
}

const filters = {
  host,
  timeAgo
}
export default filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})