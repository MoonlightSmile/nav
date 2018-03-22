var config = config();
var key = config.key;
var webLink = config.webLink;
var lock = false;
creatKbd(key, webLink)
listeningAll();
search();


//配置
function config() {
  var key = [
    ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9", "num0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ]
  var webLink = {
    "num1": "javascript.ruanyifeng.com",
    "num2": "www.163.com",
    "num3": "so.uigreat.com",
    "num4": "www.ruanyifeng.com",
    "num5": "www.iciba.com",
    "num6": "segmentfault.com",
    "num7": "jiaoyimao.com",
    "num8": "reg.163.com",
    "num9": "easy-mock.com",
    "num0": "0.30000000000000004.com",
    "a": "www.acfun.cn",
    "b": "51job.com",
    "c": "cdnjs.com",
    "d": "movie.douban.com",
    "e": "www.baidu.com",
    "f": "my.163.com",
    "g": "github.com",
    "h": "www.jianshu.com",
    "i": "www.iconfont.cn",
    "j": "jingdong.com",
    "k": "www.baidu.com",
    "l": "huaban.com",
    "m": "developer.mozilla.org",
    "n": "www.baidu.com",
    "o": "twitter.com",
    "p": "www.msj1.com",
    "q": "qq.com",
    "r": "meituan.com",
    "s": "one-piece.cn",
    "t": "taobao.com",
    "u": "www.sassmeister.com",
    "v": "bilibili.com",
    "w": "alpha.wallhaven.cc",
    "x": "xiedaimala.com",
    "y": "tool.lu",
    "z": "zhihu.com"
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
  const errorSrc = `https://i.loli.net/2017/11/15/5a0bf2eb3d95b.png`
  if (hash) {
    const src = `http://${hash}/favicon.ico`
    ele.attr("src", src)
      .on('error', function(event) {
        $(this).attr("src", errorSrc)
        throw "图标获取失败"
      })
  } else {
    ele.attr("src", errorSrc)
  }
}
//创建键盘
function creatKbd(key, webLink) {
  for (var i = 0; i < key.length; i++) {
    var $div = $("<div></div>")
    $(".wrap").append($div)
    for (var j = 0; j < key[i].length; j++) {
      var content = key[i][j].indexOf("num") > -1 ? (key[i][j].substring(3)) : key[i][j];
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


//监听事件
function listeningAll() {
  listeningEdit()
  listeningDel()
  listeningKbd()
  $("body").on("keydown", function(e) {
    if (lock) return;
    if (e.keyCode === 83 && e.altKey === true) {
      $(".arguments").focus();
      return
    }
    if (isKey(e)) {
      var thisvalue = String.fromCharCode(e.keyCode).toLowerCase();
      var idkey = /[0-9]/.test(thisvalue) ? ("num" + thisvalue) : thisvalue;
      href = webLink[idkey];
      $("#" + idkey).attr("class", "red");
      if (!href) {
        return
      }
      open("http://" + href, "_blank");
      $("#" + idkey).removeClass('red');
    }
  }).on('keyup', function(e) {
    if (lock) return;
    var thisvalue = String.fromCharCode(e.keyCode).toLowerCase();
    var idkey = /[0-9]/.test(thisvalue) ? ("num" + thisvalue) : thisvalue;
    if (isKey(e)) {
      $("#" + idkey).removeClass("red");
    }
  });
}

function listeningEdit() {
  $(".btn.edit").on("click", function(event) {
    lock = true;
    var $parentId = $(this).parent("kbd").attr("id");
    var $img = $(this).parent("kbd").find('img')
    event.stopPropagation()
    swal("请给我一个链接", {
      content: "input",
    }).then(function(value) {
      if (!value) { swal("你需要输点什么！"); return }
      webLink[$parentId] = value;
      getIco($img, webLink[$parentId])
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
    getIco($img, webLink[$parentId])
    localStorage.setItem('zzz', JSON.stringify(webLink))
  })
}

function listeningKbd() {
  $("kbd").on("click", function(event) {
    var $id = $(this).attr("id");
    if (!webLink[$id]) return
    window.open("//" + webLink[$id]);
  })
}

function isKey(e) {
  return e.keyCode > 37 && e.keyCode < 91 && e.altKey === false && e.ctrlKey === false && e.shiftKey === false && e.metaKey === false;
}

function search() {
  $(".arguments").on('focus', function(event) {
    lock = true;
  }).on('blur', function(event) {
    lock = false;
  }).on("keypress", function(e) {
    if (e.keyCode === 13 && e.altKey === true) {
      open("//www.baidu.com/s?wd=" + $('.arguments').val(), "_blank");
    } else if (e.keyCode === 13) {
      open("//www.google.com/search?q=" + $('.arguments').val(), "_blank");
    }
  });;
  $(".search").eq(0).on('click', function(event) {
    open("//www.baidu.com/s?wd=" + $('.arguments').val(), "_blank");
  })
  $(".search").eq(1).on('click', function(event) {
    open("//www.google.com/search?q=" + $('.arguments').val(), "_blank");
  });
}