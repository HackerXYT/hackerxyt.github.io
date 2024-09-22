(() => {
    var o = function() {
            let n = navigator.appVersion;
            return /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 ? "iOS" : /Android/.test(n) ? "Android" : n.indexOf("Win") !== -1 ? "Windows" : n.indexOf("Mac") !== -1 ? "MacOS" : n.indexOf("X11") !== -1 || n.indexOf("Linux") !== -1 ? "Linux" : "Unknown OS"
        }(),
        a = {
            Windows: {
                buttonName: "Windows",
                descriptionName: "Windows",
                downloadLink: "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.7/Obsidian-1.6.7.exe"
            },
            MacOS: {
                buttonName: "macOS",
                descriptionName: "macOS",
                downloadLink: "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.7/Obsidian-1.6.7.dmg"
            },
            Linux: {
                buttonName: "Linux (AppImage)",
                descriptionName: "Linux (AppImage)",
                downloadLink: "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.7/Obsidian-1.6.7.AppImage"
            },
            "Linux-Snap": {
                buttonName: "Linux",
                descriptionName: "Linux (Snap)",
                downloadLink: "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.7/obsidian-1.6.7-amd64.snap"
            },
            "Linux-Flatpak": {
                buttonName: "Linux",
                descriptionName: "Linux (Flatpak)",
                downloadLink: "https://flathub.org/apps/details/md.obsidian.Obsidian"
            },
            iOS: {
                buttonName: "iOS",
                descriptionName: "iOS",
                downloadLink: "https://apps.apple.com/us/app/obsidian-connected-notes/id1557175442"
            },
            Android: {
                buttonName: "Android",
                descriptionName: "Android",
                downloadLink: "https://play.google.com/store/apps/details?id=md.obsidian"
            }
        },
        p = ["Windows", "MacOS", "Linux", "Linux-Snap", "Linux-Flatpak", "iOS", "Android"];
    if (o !== "Windows" && o !== "Unknown OS") {
        let n = a[o];
        fishAll(".download-os").forEach(i => i.setText(n.buttonName)), fishAll(".download-button").forEach(i => i.setAttribute("href", n.downloadLink));
        let t = p.slice();
        t.remove(o);
        for (let i = 0; i < t.length; i++) {
            let r = t[i],
                s = a[r];
            fishAll(`.alt-os-${i + 1}`).forEach(l => {
                l.setText(s.descriptionName), l.setAttribute("href", s.downloadLink)
            })
        }
    }
    var u = new URLSearchParams(location.search.substring(1)),
        d = u.get("os"),
        e = "";
    d === "mac" ? e = a.MacOS.downloadLink : d === "win" ? e = a.Windows.downloadLink : d === "linux" && fish(".card.mod-linux").scrollIntoView();
    e && (window.location.href = e);
})();