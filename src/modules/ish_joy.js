const {Router} = require("@grammyjs/router");
const {Keyboard} = require("grammy");
const { bolim, YesNo } = require("../helpers/help.button");

const router  = new Router((ctx)=>ctx.session.step);

const ism = router.route("Ism");
ism.hears("Ish joyi kerak", async(ctx)=>{
    await ctx.reply(`<b>Ish joyi topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`,
        {
            parse_mode: "HTML",

        });
    await ctx.reply(`<b>Ism, familiyangizni kiriting?</b>`,
        {
            parse_mode: "HTML"
        })
    ctx.session.step = "age"
});

const age = router.route("age");
age.on("message:text", async(ctx)=>{
    await ctx.reply(`🕑 Yosh: 

Yoshingizni kiriting?
Masalan, 13`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "T"
});


const t = router.route("T");
t.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    ctx.session.age = ctx.message.text;
    ctx.session.step = "A";
});


const a = router.route("A");
a.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog'lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );
    ctx.session.t = ctx.message.text;
    ctx.session.step = "H"
});

const h = router.route("H");
h.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.a =ctx.message.text
    ctx.session.step = "N"
});

const n = router.route("N");
n.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Narxi:

Tolov qilasizmi yoki Tekinmi?
Kerak bo'lsa, Summani kiriting?`
    );
    ctx.session.h = ctx.message.text
    ctx.session.step = "K"
});

const k = router.route("K");
k.on("message:text", async(ctx)=>{
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o'qiysizmi?
Masalan, Talaba`
    );
    ctx.session.n = ctx.message.text
    ctx.session.step = "M"
});

const m = router.route("M");
m.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.k = ctx.message.text
    ctx.session.step = "Md"
});

const md = router.route("Md");
md.on("message:text", async(ctx)=>{
    await ctx.reply(`🔎 Maqsad: 

Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.m = ctx.message.text
    ctx.session.step = "F"
});

const f = router.route("F");
f.on("message:text", async(ctx) => {
    ctx.session.md = ctx.message.text;
    await ctx.reply(`Ish joyi kerak:

    👨‍💼 Xodim: ${ctx.session.fullname}
    🕑 Yosh: ${ctx.session.age}
    📚 Texnologiya: ${ctx.session.t} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.a}
    🌐 Hudud: ${ctx.session.h} 
    💰 Narxi: ${ctx.session.n} 
    👨🏻‍💻 Kasbi: ${ctx.session.kasbi}
    🕰 Murojaat qilish vaqti: ${ctx.session.m} 
    🔎 Maqsad: ${ctx.session.md} `
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...YesNo
        }
    })
    ctx.session.step = "Javob";
   
});

const javob = router.route("Javob");

javob.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...bolim
        }
    })
        
    ctx.session.step = "";    
});

javob.hears("Ha", async (ctx) => {
    console.log(ctx.message.text);
    await ctx.reply(`📪 So'rovingiz tekshirish uchun adminga jo'natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
        reply_markup: {
            ...bolim
        }
    })
});

module.exports = router;