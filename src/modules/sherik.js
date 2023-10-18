const { Router  } = require("@grammyjs/router");
const { Keyboard } = require("grammy");
const { bolim, YesNo } = require("../helpers/help.button");

const router = new Router((ctx) => ctx.session.step);

const ism = router.route("Ism");
ism.hears("Sherik kerak", async(ctx) => {
    await ctx.reply(`
<b>Sherik topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`
        , {
            parse_mode: "HTML",
        });
    await ctx.reply(`<b>Ism, familiyangizni kirining?</b>`
        , {
            parse_mode: "HTML",
        });
    ctx.session.step = "texnologiya";
});

const technology = router.route("texnologiya");
technology.on("message:text", async (ctx) => {
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 

Java, C++, C#`);
    ctx.session.firstName = ctx.message.text;
    ctx.session.step = "Aloqa";
});

const aloqa = router.route("Aloqa");
aloqa.on("message:text", async(ctx) => {
    await ctx.reply(`📞 Aloqa: 

Bog'lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`);
    ctx.session.technology = ctx.message.text;
    ctx.session.step = "Hudud";
});

const hudud = router.route("Hudud");
hudud.on("message:text", async (ctx) => {
    await ctx.reply(`
🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`);
    ctx.session.aloqa = ctx.message.text;
    ctx.session.step = "Narxi";
});

const narxi = router.route("Narxi");
narxi.on("message:text", async (ctx) => {
    await ctx.reply(`💰 Narxi:

Tolov qilasizmi yoki Tekinmi?
Kerak bo'lsa, Summani kiriting?`);
    ctx.session.hudud = ctx.message.text;
    ctx.session.step = "Kasbi";
});

const kasbi = router.route("Kasbi");
kasbi.on("message:text", async (ctx) => {
    await ctx.reply(`
👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o'qiysizmi?
Masalan, Talaba`);
    ctx.session.narxi = ctx.message.text;
    ctx.session.step = "Murojat";
});

const murojat = router.route("Murojat");
murojat.on("message:text", async (ctx) => {
    await ctx.reply(`
🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`);
    ctx.session.kasbi = ctx.message.text;
    ctx.session.step = "Maqsad";
});

const maqsad = router.route("Maqsad");
maqsad.on("message:text", async (ctx) => {
    await ctx.reply(`
🔎 Maqsad: 

Maqsadingizni qisqacha yozib bering.`);
    ctx.session.murojat = ctx.message.text;
    ctx.session.step = "Finish";
});

const finish = router.route("Finish");
finish.on("message:text", async (ctx) => {
    ctx.session.maqsad = ctx.message.text;
    await ctx.reply(`Sherik kerak:

🏅 Sherik: ${ctx.session.firstName}
📚 Texnologiya: ${ctx.session.technology}
🇺🇿 Telegram: ${ctx.from.username}
📞 Aloqa: ${ctx.session.aloqa} 
🌐 Hudud: ${ctx.session.hudud}
💰 Narxi: ${ctx.session.narxi}
👨🏻‍💻 Kasbi: ${ctx.session.kasbi}
🕰 Murojaat qilish vaqti: ${ctx.session.murojat}
🔎 Maqsad: ${ctx.session.maqsad} 

#sherik #react
`);
    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`, {
        reply_markup: {
            ...YesNo
        }
    });
      ctx.session.step = "javob";
});

const javob = router.route("javob");

javob.hears(`Yoq`, async (ctx) => {
    await ctx.reply(`Qabul qilinmadi`, {
        reply_markup: {
            ...bolim
        }
    });
    ctx.session.step = "";
});

javob.hears("Ha", async (ctx) => {
    await ctx.reply(`
📪 So'rovingiz tekshirish uchun adminga jo'natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
        reply_markup: {
            ...bolim
        }
    })
});

module.exports = router;