
import {botInit} from './botInit'

const bot = new botInit(
    {
        "token": "7197593024:AAEv2lw_Wu4MzzV6zsSms1xKkT6GmaF2e8o", // Токен бота
        "admin": 444806711 // id владельца бота
    }
)

bot.botRun()
// // Старт бота
// bot.start((ctx) => {
//     const chatId = ctx.chat.id
//             ctx.telegram.sendMessage(chatId,"выбурите опцию")   
//     }
// );


// // Слушаем на наличие объекта message
// bot.on(
//     'message', 
//     (ctx) => {
//         // убеждаемся что это админ ответил на сообщение пользователя
//         ctx.reply('hello')
        
//     }
// );

// // запускаем бот
// bot.launch();

