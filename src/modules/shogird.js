const {Router} = require("@grammyjs/router");
const { bolim, YesNo } = require("../helpers/help.button");

const router = new Router((ctx) => ctx.session.step);

const ism = router.route("Ism");
ism.hears("Shogird kerak", async (ctx) => {
    await ctx.reply(`<b>Shogird topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`,
        {
            parse_mode: "HTML",

        });
    await ctx.reply(`<b>Ism, familiyangizni kiriting?</b>`,
        {
            parse_mode: "HTML"
        });
    ctx.session.step = "ShY"
});

const shy = router.route("ShY");
shy.on("message:text", async(ctx)=>{
    await ctx.reply(`🕑 Yosh: 

Yoshingizni kiriting?
Masalan, 13`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "ShT"
});

const sht = router.route("ShT");
sht.on("message:text", async (ctx) => {
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    
    ctx.session.yosh = ctx.message.text;
    ctx.session.step = "ShA";
});

const sha = router.route("ShA");
sha.on("message:text", async (ctx) => {
    await ctx.reply(`📞 Aloqa: 

Bog'lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );

    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "ShH"
});

const shh = router.route("ShH");
shh.on("message:text", async (ctx) => {
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa =ctx.message.text
    ctx.session.step = "ShN"
});

const shn = router.route("ShN");
shn.on("message:text", async (ctx) => {
    await ctx.reply(`💰 Narxi:

To'lov qilasizmi yoki Tekinmi?
Kerak bo'lsa, Summani kiriting?`
    );
    ctx.session.hudud = ctx.message.text
    ctx.session.step = "ShK"
});

const shk = router.route("ShK");
shk.on("message:text", async (ctx) => {
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o'qiysizmi?
Masalan, Talaba`);
   
    ctx.session.narx = ctx.message.text;
    ctx.session.step = "ShM"
});

const shm = router.route("ShM");
shm.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.kasb = ctx.message.text
    ctx.session.step = "ShMd"
});

const shmd = router.route("ShMd");
shmd.on("message:text", async (ctx) => {
    await ctx.reply(`🔎 Maqsad: 

    Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.murojatvaqt = ctx.message.text
    ctx.session.step = "ShF"
});

const shf = router.route("ShF");
shf.on("message:text", async (ctx) => {
    ctx.session.maqsad = ctx.message.text;
    await ctx.reply(`Shogird kerak:

    🎓 Ustoz: ${ctx.session.fullname}
    🌐 Yosh: ${ctx.session.yosh}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    💰 Narxi: ${ctx.session.narx}
    👨🏻‍💻 Kasbi: ${ctx.session.kasb}
    🕰 Murojaat qilish vaqti: ${ctx.session.murojatvaqt} 
    🔎 Maqsad: ${ctx.session.maqsad}
    
    #shogird`
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...YesNo
        }
    })
    ctx.session.step = "shj";
   
});

const shj = router.route("shj");

shj.hears(`Yoq`, async (ctx) => {
    await ctx.reply(`Qabul qilinmadi`, {
        reply_markup: {
            ...bolim
        }
    });
    ctx.session.step = "";
});

shj.hears("Ha", async (ctx) => {
    await ctx.reply(`📪 So'rovingiz tekshirish uchun adminga jo'natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
        reply_markup: {
            ...bolim
        }
    })
});

module.exports = router;