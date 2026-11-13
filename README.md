# Whisper test stand

Изолированный клиент для single-Worker пакета whisper-server-package-v0.1.0-test.
Исходный клиент: LPYURA2/Whisper-v5, test/turn-signaling,
`942c058e0448738a75733057a59663b4dd305544` (база1.3J:9657faaa).

Плановый единственный адрес клиента:
https://lpyura2.github.io/Whisper_test/

Наличие этого адреса в документации не означает успешную публикацию. Pages нужно
включить только в этом тестовом репозитории: Settings → Pages → Deploy from a
branch → main → /(root), затем проверить реальную загрузку без авторизации и VPN.

## Настройка Worker

В `network/stand-config.js` указан фактический адрес из успешного Cloudflare deploy:
`wss://whisper-signaling-package-test.vovakrech20.workers.dev/ws`.
Production Render не используется как fallback. Успешный deploy не доказывает
публичный signaling-ready: отдельно требуется настроить допуск двух тестовых ID.
Проверка /health из среды разработки блокируется proxy403 до ответа Worker.

Серверный репозиторий: LPYURA2/whisper-signaling-test. Worker:
`whisper-signaling-package-test`; команда публикации `npm run cf:deploy`.
В его runtime environment `ALLOWED_PEER_IDS` должны содержать ровно два свежих
тестовых ID. Публичные встроенные test-peer-a/b для удалённого пилота не подходят.
ID фильтруют допуск; они не доказывают криптографическое владение профилем.

## TURN и диагностический режим

Сохранён готовый механизм942c: credentials принимаются только частной bootstrap
конфигурацией во fragment, немедленно удаляются из адресной строки и остаются
в RAM. В исходниках, публичной ссылке, хранилищах и диагностическом экспорте
учётных данных нет. Никогда не помещайте секреты в query string или stand-config.js.
Публичный базовый URL без bootstrap использует all/STUN-only; это не TURN PASS.

Для проверки одного транспорта используются `turn=express-udp` или `express-tcp`
и `ice=relay` либо `ice=all`. Настоящая пара передаётся владельцу отдельно от
публичного адреса. Relay без пригодной конфигурации явно завершается ошибкой,
без скрытого direct fallback. Нет backend выдачи TURN или дополнительных API keys.

## Изоляция и сохранность1.3J

Storage namespace только этого стенда:
`whisper-test:Whisper_test:package-r1:`. Не читаются и не мигрируются production
ключи profile/contacts/chats. Нет localStorage.clear(), удаления чужих Service
Worker или CacheStorage. Скрипт SW и его регистрация сохранены: ./sw.js разрешается
относительно документа /Whisper_test/, scope ограничен каталогом стенда.

PeerManager, RTCManager и Signaling сохранены из942c. WSClient меняет только
источник public endpoint и проверку отсутствующей настройки до создания сокета;
сроки25/60/15, reconnect/backoff/guards не переписываются. Нет федерации.

## Два Android

1. Открыть клиент в Chrome без VPN, создать разные свежие тестовые профили.
2. Настроить их допуск на Worker и добавить ID друг друга в контакты.
3. Получить по3 сообщения в каждую сторону. После потери/возврата сети повторить
   обмен без удаления профиля и перезагрузки страницы.
4. В отдельном relay-прогоне проверить PCconnected, ICEconnected/completed,
   DCopen, выбранную активную relay-пару с типами обоих кандидатов и фактическое
   получение сообщений. Одиночный relay-кандидат недостаточен.
5. При сбое копировать безопасный экспорт панели через30с и90с; не публиковать
   обычные сырые SDP/profile логи или частную bootstrap ссылку.

Тестовые публикации должны открываться без OpenAI/ChatGPT/GitHub авторизации.
Модели, настоящий WSS, настоящий WebRTC и Android в отчёте отмечаются отдельно;
непроведённые проверки — NOT RUN, ограниченная доступом проверка — BLOCKED.
