// Public build identity and endpoint catalog only; never place credentials here.
export const BUILD_INFO = Object.freeze({
    name: "Whisper test stand",
    id: "whisper-package-stand-r1",
    base: "9657faaaa59c31d3b3c2c489fc9a20a61e6fe5b0",
    sourceCommit: "942c058e0448738a75733057a59663b4dd305544"
});
export const STUN_URI = "stun:stun.l.google.com:19302";
// Diagnostic candidates only. No candidate is silently promoted into normal mode.
export const TURN_CANDIDATES = Object.freeze({
    "express-udp": Object.freeze({ uri: "turn:free.expressturn.com:3478?transport=udp", transport: "udp" }),
    "express-tcp": Object.freeze({ uri: "turn:free.expressturn.com:3478?transport=tcp", transport: "tcp" })
});
export const TURN_URIS = Object.freeze(Object.values(TURN_CANDIDATES).map(item => item.uri));
