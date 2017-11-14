var config = config();
var key = config.key;
var webLink = config.webLink;
var lock = false;
creatKbd(key, webLink)
listeningAll();


//配置
function config() {
  var key = [
    ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ]
  var webLink = {
    num1: "jingdong.com",
    num2: "jingdong.com",
    num3: "jingdong.com",
    num4: "jingdong.com",
    num5: "jingdong.com",
    num6: "jingdong.com",
    num7: "jingdong.com",
    num8: "jingdong.com",
    num9: "jingdong.com",
    num0: "jingdong.com",
    a: "acfun.cn",
    b: "baidu.com",
    c: "douban.com",
    d: "douban.com",
    e: "douban.com",
    f: "douban.com",
    g: "github.com",
    h: "acfun.cn",
    i: "acfun.cn",
    j: "jingdong.com",
    k: "google.com",
    l: "google.com",
    m: "google.com",
    n: "google.com",
    o: "google.com",
    p: "google.com",
    q: "qq.com",
    r: "zhihu.com",
    s: "zhihu.com",
    t: "zhihu.com",
    u: "zhihu.com",
    v: "zhihu.com",
    w: "weibo.com",
    x: "zhihu.com",
    y: "zhihu.com",
    z: "zhihu.com"
  }
  hashInLocalStorage = JSON.parse(localStorage.getItem('zzz') || 'null')
  if (hashInLocalStorage) {
    webLink = hashInLocalStorage
  }
  return {
    "key": key,
    "webLink": webLink
  }
}
//获取图标
function getIco(ele, hash) {
  var src = "";
  src = "http://" + hash + "/favicon.ico"
  ele.on('error', function(event) {
      $(this).attr("src", "https://i.loli.net/2017/11/15/5a0b15f576679.png")
  }).attr("src", src);
}
//创建键盘
function creatKbd(key, webLink) {
  for (var i = 0; i < key.length; i++) {
    var $div = $("<div></div>")
    $(".wrap").append($div)
    for (var j = 0; j < key[i].length; j++) {
      var content = key[i][j].indexOf("num")>-1 ? (key[i][j].substring(3)) : key[i][j];
      var $kbd = $('<kbd id=' + key[i][j] + '>' + content + '</kbd>')
      var $img = $('<img></img>')
      var $edit = $('<sapn class="btn edit">E<sapn>')
      var $del = $('<sapn class="btn del">D<sapn>')
      var link = webLink[key[i][j]]
      getIco($img, link)
      $div.append($kbd)
      $kbd.append($img).append($edit).append($del)
    }
  }
}

function listeningEdit() {
  $(".btn.edit").on("click", function(event) {
    lock = true;
    var $parentId = $(this).parent("kbd").attr("id");
    var $img = $(this).parent("kbd").find('img')
    event.stopPropagation()
    swal("请给我一个链接", {
      content: "input",
    }).then(function(value){
      webLink[$parentId] = value;
      getIco($img,webLink[$parentId])
      localStorage.setItem('zzz', JSON.stringify(webLink))
      lock = false;
    })
  })
}

function listeningDel() {
  $(".btn.del").on("click", function(event) {
    event.stopPropagation()
    var $parentId = $(this).parent("kbd").attr("id");
    var $img = $(this).parent("kbd").find('img')
    webLink[$parentId] = "";
    getIco($img,webLink[$parentId])
    localStorage.setItem('zzz', JSON.stringify(webLink))
  })
}

function listeningKbd() {
  $("kbd").on("click", function(event) {
    var $id = $(this).attr("id");
    if(!webLink[$id]) return
    window.open("http:/"+webLink[$id]);
  })
}

function listeningAll(){
    listeningEdit()
    listeningDel()
    listeningKbd()
    $("body").on("keydown", function(e) {
      if(lock) return;
      if (isKey(e)) {
        var thisvalue = String.fromCharCode(e.keyCode).toLowerCase();
        var idkey = /[0-9]/.test(thisvalue) ? ("num" + thisvalue) : thisvalue;
        href = webLink[idkey];
        $("#" + idkey).attr("class", "red");
        if (!href) {
          return
        }
        open("http://www." + href, "_blank");
        $("#" + idkey).removeClass('red');
      }
     }).on('keyup', function(e) {
      if(lock) return;
      var thisvalue = String.fromCharCode(e.keyCode).toLowerCase();
      var idkey = /[0-9]/.test(thisvalue) ? ("num" + thisvalue) : thisvalue;
      if (isKey(e)) {
        $("#" + idkey).removeClass("red");
      }
      });
}

function isKey(e) {
  return e.keyCode > 37 && e.keyCode < 91 && e.altKey === false && e.ctrlKey === false&&e.shiftKey
===false;
}





