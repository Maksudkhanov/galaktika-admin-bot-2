const { match } = require('assert');
var fs = require('fs')
var TelegramBot = require('node-telegram-bot-api');


var token = '';
var bot = new TelegramBot(token, { polling: true });

//admin id
let idAdmin = 1362181161
let cources = ['Математика (весь курс)', 'Математика (базовый блок)', 'Английский язык (Elementary)', 'Английский язык (Pre-intermrdiate)', 
'Английский язык (Intermediate)', 'Английский язык (General)',
 'История (весь курс)', 'История Узбекистана', 'Физика', 'Химия', 'Русский язык и литература','Русский язык', 'Русский язык (разговорный курс)', 'Биология']


let userCources = []
let userClass = []
let userTime = []
let userDays = []

bot.onText(/\/start/, (msg) => {


    bot.sendMessage(msg.chat.id, "Здравствуйте, " + msg.from.first_name + ". Выберите команду.", {
        "reply_markup": {
            "keyboard": [["Записаться", "Локация"], ["Цены", "Вопрос-Ответ"]]
        }, 
        
    });

});
bot.on('message', (msg) => {

    if (msg.text.indexOf('Цены') === 0) {
        bot.sendMessage(msg.chat.id, "<b>1 предмет - 450.000 сум\n\n2 предмета - 800.000 сум\n\n3 предмета - 1.000.000 сум</b>", { parse_mode: "HTML" })
    }
})

bot.on('message', (msg) => {

    if (msg.text.indexOf('Вопрос-Ответ') === 0) {
        bot.sendMessage(msg.chat.id, "Тут будут наиболее задаваемые вопросы и ответы на них", { parse_mode: "HTML" })
    }
})

bot.on('message', (msg) => {

    if (msg.text.indexOf('Локация') === 0) {
        bot.sendLocation(msg.chat.id, 41.30814687226026, 69.2833167578549)
    }
})

//['Математика', 'Английский', 'История', 'Физика', 'Химия', 'Русский', 'Литература']


bot.on('message', (msg) => {

    if (msg.text.indexOf('Записаться') === 0 || msg.text.indexOf('Выбрать еще предмет') === 0) {
        bot.sendMessage(msg.chat.id, 'Выберите предметы', {
            'reply_markup': {
                'keyboard': [['Математика'], ['Английский язык'], ['Физика'], ['Химия'], ['История'], ['Руccкий язык']/* cc from en*/, ['Биология']]
            }
        })

        
    }
})



bot.on('message', (msg) => {

    if (msg.text.indexOf('Математика')===0) {
        bot.sendMessage(msg.chat.id, 'Выберите курс', {
            'reply_markup': {
                'keyboard': [['Математика (весь курс)'], ['Математика (базовый блок)']]
            }
        })
        
    }
})

bot.on('message', (msg) => {

    if (msg.text.indexOf('Руccкий язык'/* cc from en*/)===0) {
        bot.sendMessage(msg.chat.id, 'Выберите курс', {
            'reply_markup': {
                'keyboard': [['Русский язык' , 'Русский язык и литература'], ['Русский язык (разговорный курс)']]
            }
        })
        
    }
})

bot.on('message', (msg) => {

    if (msg.text.indexOf('История')===0) {
        bot.sendMessage(msg.chat.id, 'Выберите курс', {
            'reply_markup': {
                'keyboard': [['История (весь курс)'], ['История Узбекистана']]
            }
        })
        
    }
})

bot.on('message', (msg) => {

    if (msg.text.indexOf('Английский язык')===0) {
        bot.sendMessage(msg.chat.id, 'Выберите курс', {
            'reply_markup': {
                'keyboard': [['Английский язык (General)', 'Английский язык (Elementary)'],
                ['Английский язык (Pre-intermediate)', 'Английский язык (Intermediate)']]
            }
        })
        
    }
})



bot.on('message', (msg) => {

    if (cources.includes(msg.text)) {
        bot.sendMessage(msg.chat.id, 'Вы выбрали курс ' + msg.text, {
            'reply_markup': {
                'keyboard': [['Выбрать еще предмет'], ['Этого достаточно']]
            }
        })
        if(!userCources.includes(msg.text)){
            userCources.push(msg.text)
        }
    }
})

bot.on('message', (msg) => {

    if (msg.text.indexOf('Этого достаточно') === 0) {
        bot.sendMessage(msg.chat.id, 'Год поступления' , {
            'reply_markup': {
                'keyboard': [['8-9 класс', '10 класс'],['Абитуриент текущего года']]
            }
    })
    }  
})

//90 || 91 || 93 || 94 || 98 || 99 || 33

bot.on('message', msg => {
    if(msg.text.indexOf('8-9 класс') ===0 || msg.text.indexOf('10 класс') ===0 || msg.text.indexOf('Абитуриент текущего года')===0) {
        bot.sendMessage(msg.chat.id, 'Выберите удобное время' , {
            'reply_markup': {
                'keyboard': [['10:00-11:30', '11:30-13:00'],['14:00-15:30', '15:30-17:00'],['17:00-18:30', '18:30-20:00'],['Подходит любое время']]
            }
    })
    userClass.push(msg.text)
    }

    
})


bot.on('message', msg => {
    let condition = msg.text.indexOf('10:00-11:30')===0 || msg.text.indexOf('11:30-13:00')===0 ||msg.text.indexOf('14:00-15:30')===0 ||msg.text.indexOf('15:30-17:00')===0 ||msg.text.indexOf('17:00-18:30')===0 || msg.text.indexOf('18:30-20:00')===0 ||msg.text.indexOf('Подходит любое время')===0
    if(condition) {
        bot.sendMessage(msg.chat.id, 'Выберите удобные дни' , {
            'reply_markup': {
                'keyboard': [['Понедельник Среда Пятница','Вторник Четверг Суббота'],['Подходят любые дни']]
            }
    })
        userTime.push(msg.text)
    }

})


bot.on('message', msg => {
    if(msg.text.indexOf('Понедельник Среда Пятница')===0 || msg.text.indexOf('Вторник Четверг Суббота')===0 || msg.text.indexOf('Подходят любые дни')===0) {
        bot.sendMessage(msg.chat.id, "<b>Оставьте свои данные в следующем виде:</b> \n\n <i>Имя Фамилия Контакт </i>\n\nПример: Алексей Петров 935898756", { parse_mode: "HTML" })
        userDays.push(msg.text)
    }
})

bot.on('message', (msg) => {
    let condition = msg.text.includes(90) || msg.text.includes(91) || msg.text.includes(93) || msg.text.includes(94) || msg.text.includes(95) || msg.text.includes(97) || msg.text.includes(98) || msg.text.includes(99) ||msg.text.includes(33) 

    if(condition) {
        if(userCources.length===1) {
            //for user
            fs.appendFileSync('results.txt', `<b>Ваши данные:</b>\n\n${msg.text}\n\nВыбранный курс: ${userCources.join(' ')}\n\nГод поступления: ${userClass[0]}\n\nУдобное время: ${userTime[0]}\n\nУдобные дни: ${userDays[0]}`)
            //for admin
            fs.appendFileSync('admin.txt', `<b>Данные ученика:</b>\n\n${msg.text}\n\nUsername: @${msg.from.username}\n\nВыбранный курс: ${userCources.join(' ')}\n\nГод поступления: ${userClass[0]}\n\nУдобное время: ${userTime[0]}\n\nУдобные дни: ${userDays[0]}`)

        } else {
            //for user
            fs.appendFileSync('results.txt', `<b>Ваши данные:</b>\n\n${msg.text}\n\nВыбранные курсы: ${userCources.join(', ')}\n\nГод поступления: ${userClass[0]}\n\nУдобное время: ${userTime[0]}\n\nУдобные дни: ${userDays[0]}`)
            //for admin
            fs.appendFileSync('admin.txt', `<b>Данные ученика:</b>\n\n${msg.text}\n\nUsername: @${msg.from.username}\n\nВыбранные курсы: ${userCources.join(', ')}\n\nГод поступления: ${userClass[0]}\n\nУдобное время: ${userTime[0]}\n\nУдобные дни: ${userDays[0]}`)

        }
        userCources.length=0
        userClass.length=0
        userDays.length=0
        userTime.length=0
        bot.sendMessage(msg.chat.id, fs.readFileSync('results.txt'), {parse_mode: 'HTML'})
        bot.sendMessage(idAdmin, fs.readFileSync('admin.txt'), {parse_mode: 'HTML'})



        bot.sendMessage(msg.chat.id, 'Ваша заявка принята. Мы вам сообщим об открытии группы\n\nА пока можете подписаться на наш канал 👉@___', {
            "reply_markup": {
                "keyboard": [["Записаться", "Локация"], ["Цены", "Вопрос-Ответ"]]
            }
    })
    }
        
      
        fs.writeFileSync('results.txt', '')
        fs.writeFileSync('admin.txt', '')
    
})
