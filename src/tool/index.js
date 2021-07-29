export const cookie = function (name, value, days) {
  // if value is undefined, get the cookie value
  if (value === undefined) {
    var cookiestring = '; ' + window.document.cookie
    var cookies = cookiestring.split('; ' + name + '=')
    if (cookies.length === 2) {
      return cookies.pop().split(';').shift()
    }
    return null
  } else {
    // if value is a false boolean, we'll treat that as a delete
    if (value === false) {
      days = -1
    }
    var expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toGMTString()
    }
    window.document.cookie = name + '=' + value + expires + '; path=/'
  }
}

export const validate = {
  mobile (telephone) {
    let pattern = /^(1.[0-9]{9})$/
    return pattern.test(telephone)
  }
}

var minute = 1000 * 60
var hour = minute * 60
var day = hour * 24

// 计算时间差
export const handleDate = (dateTimeStamp) => {
  var result = ''
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    console.log('时间不对劲,服务器创建时间与当前时间不同步')
    return '刚刚'
  }
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  if (parseInt(dayC) > 2) {
    result = '' + this.$format(dateTimeStamp, 'yyyy-MM-dd')
  } else if (parseInt(dayC) > 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (parseInt(dayC) === 1) {
    result = '昨天'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 5) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}
