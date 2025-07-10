import fs from 'fs';
import os from 'node:os'
import { globSync } from 'fast-glob'

// This is where the sound.properties files likely live:
// ~/.local/share/flatpak/runtime/com.jagex.Launcher.ThirdParty.RuneLite/x86_64/stable/active/files/jre/conf/sound.properties
// /var/lib/flatpak/app/net.runelite.RuneLite/x86_64/stable/active/files/jre/conf/sound.properties

const lines = [
    "javax.sound.sampled.Clip=com.sun.media.sound.DirectAudioDeviceProvider",
	"javax.sound.sampled.Port=com.sun.media.sound.PortMixerProvider",
	"javax.sound.sampled.SourceDataLine=com.sun.media.sound.DirectAudioDeviceProvider",
	"javax.sound.sampled.TargetDataLine=com.sun.media.sound.DirectAudioDeviceProvider",
];

const patterns = [
	`${os.homedir()}/.local/share/flatpak/runtime/*.RuneLite/**/stable/**/files/jre/conf/sound.properties`,
	`/var/lib/flatpak/app/*.RuneLite/**/stable/**/files/jre/conf/sound.properties`
]

let files: string[] = [];

console.log(`[RuneLite Sound Patcher] Starting File Scan`);

for(const pattern of patterns) {
	files = [...files, ...globSync(pattern, { suppressErrors: true, onlyFiles: true })];
}

console.log(`[RuneLite Sound Patcher] Found ${files.length} Files`)

if (files.length <= 0) {
	console.log(`[RuneLite Sound Patcher] No Additional Files Found, Exiting`);
	process.exit(1);
}

console.log(`[RuneLite Sound Patcher] Patching Files`);

let filesPatched = 0;
for(const file of files) {
	const content = fs.readFileSync(file, 'utf-8');
	let wasChanged = false;
	for(const line of lines) {
		if (content.includes(line)) {
			continue;
		}

		fs.appendFileSync(file, '\n' + line + '\n');
		wasChanged = true;
	}

	if (wasChanged) {
		console.log(`[RuneLite Sound Patcher] Patched ${file}`);
		filesPatched += 1;
	}
}

const msg = filesPatched >= 1 ? 
	`[RuneLite Sound Patcher] Patched ${filesPatched} Files` : `[RuneLite Sound Patcher] No Files Patched`;

console.log(msg);