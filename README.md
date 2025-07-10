# RuneLite Linux Sound / Audio Patcher

If you have no sound, or no audio with RuneLite on Linux then this is the solution for you.

This is a small program that simply patches the `sound.properties` files for RuneLite.

Run the program, and it'll just append some data to the files to get the ALSA working again.

## Everyone Else

Download the latest version from the `releases` tab on the right.

You will have to run this as `sudo` to write to directories under `/var` that contain `RuneLite`.

```sh
chmod +x ./runelite-sound-patcher
```

```sh
sudo ./runelite-sound-patcher
```

## Developers

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Install

```bash
bun install
```

### Run

```bash
bun run start
```

### Build

```sh
bun run build
```