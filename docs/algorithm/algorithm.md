---
title: 数据结构与算法
date: 2023-05-01 08:51:39
tags:
  - 数据结构与算法
categories:
  - 数据结构与算法
---

如果我们只是想了解语言的应用层面，那么数据结构和算法显得没有那么重要，但是如果我们希望了解语言的设计层面，那么数据结构和算法就非常的重要。
常见的数据结构：

- 数组（Array）
- 栈（Stack）
- 链表（Linked List）
- 图（Graph）
- 散列表（Hash）
- 队列（Queue）
- 树（Tree）
- 堆（Heap）

## 复杂度

数据结构和算法是为了解决“如何让计算机更快时间、更省空间的完成既定任务的”问题的。因此，**执行时间**和**占用空间**就成为了评判数据结构和算法性能的两个维度。这两个维度就成为复杂度。通常使用大 O 表示法表示一个数据结构和算法的复杂度。

## 数组

数组作为 JavaScript 中的一种基本数据结构，此处就不多介绍了，这里介绍一下数组中各种操作的时间复杂度：

- 访问：O(1)
- 搜索：O(N)
- 插入：O(N)
- 删除：O(N)

## 栈

我们知道数组是一种线性结构，并且可以在数组的任意位置插入和删除数据。但是有时候,我们为了实现某些功能,必须对这种任意性加以限制，而栈和队列就是比较常见的受限的线性结构。栈是基于数组实现的一种线性结构。

<div style="text-align: center">
<img src="./img/stack.png">
</div>

栈( stack )，它是一种受限的线性表,后进先出(LIFO)

1、其限制是仅允许在表的一端进行插入和删除运算。这一端被称为栈顶，相对地，把另一端称为栈底。

2、LIFO(last in first out)表示就是后进入的元素，第一个弹出栈空间。类似于自动餐托盘,最后放上的托盘,往往先把拿出去使用。

3、向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素

4、从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

### 栈的基本操作

```js
function Stack() {
  this.items = []
  // 压栈
  Stack.prototype.push = function (el) {
    this.items.push(el)
  }
  // 出栈
  Stack.prototype.pop = function () {
    return this.items.pop()
  }
  // 查看栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1]
  }
  // 查看栈中是否有元素
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  // 查看栈的长度
  Stack.prototype.size = function () {
    return this.items.length
  }
  // 返回字符串
  Stack.prototype.toString = function () {
    return this.items.join(' ')
  }
}
```

### 时间复杂度

访问：O(1)

搜索：O(N)

插入：O(1)

删除：O(1)

## 队列

队列(Queue)，也是一种受限的数据结构。它是一种受限的线性表，先进先出(FIFO First In First Out)，受限之处在于它只允许在表的前端（ front ）进行删除操作(出队)，而在表的后端（rear）进行插入操作(入队)。

### 队列的基本操作

```js
function Queue() {
  this.items = []
  // 入队
  Queue.prototype.enqueue = function (element) {
    this.items.push(element)
  }
  // 出队
  Queue.prototype.dequeue = function () {
    return this.items.shift()
  }
  // 返回队列中第一个元素
  Queue.prototype.front = function () {
    return this.items[0]
  }
  // 判断队列是否为空
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  // 返回队列长度
  Queue.prototype.size = function () {
    return this.items.length
  }
  // 拼接队列
  Queue.prototype.toString = function () {
    return this.items.join(' ')
  }
}
```

### 优先级队列

我们知道,普通的队列插入一个元素，数据会被放在后端，并且需要前面所有的元素都处理完成后才会处理前面的数据。但是优先级队列在插入一个元素的时候会考虑该数据的优先级。插入时先和其他数据优先级进行比较，比较完成后,可以得出这个元素在队列中正确的位置。其他处理方式,和基本队列的处理方式一样。

优先级队列主要考虑的问题:

- 每个元素不再只是一个数据，还会包含数据的优先级
- 在添加方式中，根据优先级放入正确的位置。

### 优先队列的实现

优先队列的实质依然是队列，只不过在插入元素的时候会考虑元素的优先级。因此，除了插入方法，其余方法和普通队列并无区别。

```js
function PriorityQueue() {
  function Queue(element, priority) {
    this.element = element
    this.priority = priority
  }
  this.items = []

  PriorityQueue.prototype.enqueue = function (element, priority) {
    var queueElement = new Queue(element, priority)
    if (!this.items.length) {
      this.items.push(queueElement)
    } else {
      var added = false
      for (var i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement)
          added = true
          break
        }
      }
      if (!added) {
        this.items.push(queueElement)
      }
    }
  }
}
```

### 时间复制度

访问：O(N)

搜索：O(N)

插入：O(1)

删除：O(1)

## 链表

链表和数组一样，可以用于存储一系列的元素，但是链表和数组的实现机制完全不同。数组的创建通常需要申请一段连续的内存空间(一整块的内存)，并且大多数编程语言当中，数组大小是固定的，所以当当前数组不能满足容量需求时,需要扩容。(一般情况下是申请一个更大的数组,比如 2 倍，然后将原数组中的元素复制过去)，而扩容是非常消耗性能的。而且在数组开头或中间位置插入数据的成本很高,需要进行大量元素的位移。

链表也是一种能够存储多个元素的数据结构。链表的每个元素都是由一个存储元素本身的节点和一个指向下一个元素的引用指针组成，因此，链表无需像数组那样需要申请一段连续的内存空间。

### 链表和数组比较

和数组相比，链表有以下优点：

- 内存空间不是必须连续的。这样可以充分利用计算机的内存，实现灵活的内存动态管理。
- 链表不必在创建时就确定大小，并且大小可以无限的延伸下去。
- 链表在插入和删除数据时，时间复杂度可以达到 O(1)，相对数组效率高很多。

相对于数组,链表有一些缺点：

1、链表访问任何一个位置的元素时，都需要从头开始访问(无法跳过第一个元素访问任何一个元素)。

2、无法通过下标直接访问元素，需要从头一个个访问，直到找到对应的元素。

### 链表实现

<details>
<summary style="margin: 20px 0;color: #4e98bb; cursor: pointer">展开查看实现代码</summary>

```js
function LinkList() {
  function Node(data) {
    this.data = data
    this.next = null
  }
  this.head = null
  this.length = 0

  // 追加
  LinkList.prototype.append = function (data) {
    // 创建新节点
    var node = new Node(data)
    if (this.length === 0) {
      // 追加的是第一个节点，直接将head指向新节点
      this.head = node
    } else {
      // 否则，循环找到最后一个节点，并把最后一个节点的next指向新节点
      var current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    // 长度加1
    this.length++
  }

  // 拼接
  LinkList.prototype.toString = function () {
    var res = ''
    var current = this.head
    while (current) {
      res += current.data + ' '
      current = current.next
    }
    return res
  }

  // 插入
  LinkList.prototype.insert = function (position, data) {
    // 边界条件判断
    if (position < 0 || position > this.length) return false
    var node = new Node(data)
    // 如果插入的是第一个位置
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      var index = 0
      var current = this.head
      var previous = null
      // 找到插入位的那个元素以及前一个元素
      while (index++ < position) {
        previous = current
        current = current.next
      }
      // 更换指针
      node.next = current
      previous.next = node
      this.length++
      return true
    }
  }

  // 访问
  LinkList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return null
    var current = this.head
    var index = 0
    while (index++ < position) {
      current = current.next
    }
    return current.data
  }

  // 返回索引
  LinkList.prototype.indexOf = function (data) {
    var current = this.head
    var index = 0
    while (current) {
      // 如果找到了，直接返回index
      if (current.data === data) {
        return index
      }
      current = current.next
      index++
    }
    // 如果到最后也没有找到，返回-1
    return -1
  }

  // 修改
  LinkList.prototype.update = function (position, data) {
    if (position < 0 || position >= this.length) return false
    var current = this.head
    var index = 0
    while (index++ < position) {
      current = current.next
    }
    current.data = data
    return true
  }

  // 移除某个位置的元素
  LinkList.prototype.removeAt = function (position) {
    var current = this.head
    var previous = null
    if (position < 0 || position >= this.length) {
      return null
    } else if (position === 0) {
      this.head = this.head.next
    } else {
      var index = 0
      while (index++ < position) {
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
    this.length--
    return current
  }

  // 移除某个元素
  LinkList.prototype.remove = function (data) {
    var position = this.indexOf(data)
    return this.removeAt(position)
  }

  // 判断链表是否为空
  LinkList.prototype.isEmpty = function () {
    return this.length === 0
  }

  // 获取链表长度
  LinkList.prototype.size = function () {
    return this.length
  }
}
```

</details>

## 双向链表

前面我们介绍的其实是单向链表，即只能从头遍历到尾，链表相连的过程是单向的。实现的原理是上一个链表中有一个指向下一个的引用。

单向链表有一个比较明显的缺点：我们可以轻松的到达下一个节点，但是回到前一个节点是很难的。双向链表就能很好的解决这个问题，它既可以从头遍历到尾，又可以从尾遍历到头，也就是链表相连的过程是双向的。它的实现原理就是一个节点既有向前连接的引用，也有一个向后连接的引用。

:::tip
双向链表的缺点是相当于单向链表，必然占用内存空间更大一些。
:::

双向链表的特点：

- 可以使用一个 head 和一个 tail 分别指向头部和尾部的节点
- 每个节点都由三部分组成:前一个节点的指针(prev)/保存的元素(item)/后一个节点的指针(next)
- 双向链表的第一个节点的 prev 是 null
- 双向链表的最后的节点的 next 是 null

### 双向链表的实现

<details>
<summary style="margin: 20px 0;color: #4e98bb; cursor: pointer">展开查看实现代码</summary>

```js
function DoublyLinkList() {
  this.head = null
  this.tail = null
  this.length = 0
  function Node(data) {
    this.prev = null
    this.data = data
    this.next = null
  }

  // 追加
  DoublyLinkList.prototype.append = function (data) {
    var node = new Node(data)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    }
    this.length++
  }

  // 拼接
  DoublyLinkList.prototype.toString = function () {
    var res = ''
    var current = this.head
    while (current) {
      res += current.data + ' '
      current = current.next
    }
    return res
  }

  // 逆向遍历节点并返回
  DoublyLinkList.prototype.forwardString = function () {
    var res = ''
    var current = this.tail
    while (current) {
      res += current.data + ' '
      current = current.prev
    }
    return res
  }

  // 插入
  DoublyLinkList.prototype.insert = function (position, data) {
    if (position < 0 || position > this.length) return false
    var node = new Node(data)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      if (position === 0) {
        this.head.prev = node
        node.next = this.head
        this.head = node
      } else if (position === this.length) {
        this.tail.next = node
        node.prev = this.tail
        this.tail = node
      } else {
        var current = null
        if (position <= this.length / 2) {
          var index = 0
          current = this.head
          while (index++ < position) {
            current = current.next
          }
        } else {
          var index = this.length - 1
          current = this.tail
          while (index-- > position) {
            current = current.prev
          }
        }
        current.prev.next = node
        node.prev = current.prev
        current.prev = node
        node.next = current
      }
    }
    this.length++
    return true
  }

  // 访问
  DoublyLinkList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return null
    var current
    var index
    if (position <= this.length / 2) {
      index = 0
      current = this.head
      while (index++ < position) {
        current = current.next
      }
    } else {
      index = this.length - 1
      current = this.tail
      while (index-- > position) {
        current = current.prev
      }
    }
    return current
  }

  // 返回索引
  DoublyLinkList.prototype.indexOf = function (data) {
    var current = this.head
    var index = 0
    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }

  // 修改
  DoublyLinkList.prototype.update = function (position, data) {
    if (position < 0 || position >= this.length) return false
    var current
    var index
    if (position <= this.length / 2) {
      current = this.head
      index = 0
      while (index++ < position) {
        current = current.next
      }
    } else {
      current = this.tail
      index = this.length - 1
      while (index-- > position) {
        current = current.prev
      }
    }
    current.data = data
    return true
  }

  // 删除某个位置的元素
  DoublyLinkList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return null
    var current
    if (this.length === 1) {
      current = this.head
      this.tail = null
      this.head = null
    } else {
      if (position === 0) {
        current = this.head
        this.head.next.prev = null
        this.head = this.head.next
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail.prev.next = null
        this.tail = this.tail.prev
      } else {
        if (position <= this.length / 2) {
          current = this.head
          var index = 0
          while (index++ < position) {
            current = current.next
          }
        } else {
          current = this.tail
          var index = this.length - 1
          while (index-- > position) {
            current = current.prev
          }
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }
    }
    this.length--
    return current
  }

  //  删除元素
  DoublyLinkList.prototype.remove = function (data) {
    var index = this.indexOf(data)
    return this.removeAt(index)
  }
}
```

</details>

## 集合

集合通常是由一组无序的，不能重复的元素构成。没有顺序意味着不能通过下标值进行访问，不能重复意味着相同的对象在集合中只会存在一份。

### 集合的实现

<details>
<summary style="margin: 20px 0;color: #4e98bb; cursor: pointer">展开查看实现代码</summary>

```js
function Set() {
  // 属性
  this.items = {}

  // 方法

  Set.prototype.add = function (value) {
    // 如果已存在value，则不添加
    if (this.has(value)) {
      return false
    } else {
      this.items[value] = value
      return true
    }
  }

  Set.prototype.has = function (value) {
    return this.items.hasOwnProperty(value)
  }
  Set.prototype.remove = function (value) {
    if (!this.has(value)) {
      return false
    } else {
      return delete this.items[value]
    }
  }
  Set.prototype.size = function () {
    return Object.keys(this.items).length
  }
  Set.prototype.clear = function () {
    this.items = {}
  }
  Set.prototype.values = function () {
    return Object.keys(this.items)
  }
}
```

</details>

### 集合间操作

1、并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。

2、交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。

3、差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合

4、子集：验证一个给定集合是否是另一集合的子集。

<details>
<summary style="margin: 20px 0;color: #4e98bb; cursor: pointer">展开查看实现代码</summary>

```js
// 并集
Set.prototype.union = function (otherSet) {
  var unionSet = new Set()
  var values = otherSet.values()
  for (var i = 0; i < values.length; i++) {
    unionSet.add(values[i])
  }
  values = this.values()
  for (var i = 0; i < values.length; i++) {
    unionSet.add(values[i])
  }
  return unionSet
}

// 交集
Set.prototype.intersection = function (otherSet) {
  var intersectionSet = new Set()
  var values = this.values()
  for (var i = 0; i < values.length; i++) {
    if (otherSet.has(values[i])) {
      intersectionSet.add(values[i])
    }
  }
  return intersectionSet
}

// 差集
Set.prototype.difference = function (otherSet) {
  var differenceSet = new Set()
  var values = this.values()
  for (let i = 0; i < values.length; i++) {
    if (!otherSet.has(values[i])) {
      differenceSet.add(values[i])
    }
  }
  return differenceSet
}

// 子集
Set.prototype.subSet = function (otherSet) {
  var values = this.values()
  for (var i = 0; i < values.length; i++) {
    if (!otherSet.has(values[i])) return false
  }
  return true
}
```

</details>

## 哈希表

哈希表的结构就是数组，但是它神奇的地方在于对下标值的一种变换，这种变换我们可以称之为哈希函数，通过哈希函数可以获取到 HashCode。

哈希表通常是基于数组进行实现的，但是相对于数组，它又有许多的优势：

- 它可以提供非常快速的插入-删除-查找操作
- 无论多少数据,插入和删除值需要接近常量的时间：即 O(1)的时间级。实际上，只需要几个机器指令即可完成
- 哈希表的速度比树还要快，基本可以瞬间查找到想要的元素。
- 哈希表相对于树来说编码要容易很多。

当然哈希表相对于数组也有自己的一些不足：

- 哈希表中的数据是没有顺序的，所以不能以一种固定的方式(比如从小到大)来遍历其中的元素。
- 通常情况下，哈希表中的 key 是不允许重复的，不能放置相同的 key，用于保存不同的元素.

了解了哈希表后，我们还需要区分下面几个概念：

1、哈希化：将大数字转化成数组范围内下标的过程，我们就称之为哈希化。

2、哈希函数：通常我们会将单词转成大数字，大数字再进行哈希化的代码实现放在一个函数中，这个函数我们成为哈希函数。即，实现哈希化的函数。

3、哈希表：最终将数据插入到的这个数组，对整个结构的封装，我们就称之为是一个哈希表

### 冲突

前面提到过，哈希表是不允许在存在相同的 key 作为数组下标的，但是经过哈希化后的数据不可避免的会得到相同结果，即，相同的 key。这种情况我们称之为冲突。

解决冲突主要有两种方式：

1、链地址法

2、开放地址法

### 链地址法

链地址法是一种比较常见的解决冲突的方案(也称为拉链法)。

链地址法解决冲突的办法是每个数组单元中存储的不再是单个数据，而是一个链条。这个链条常见的是使用数组或者链表。比如是链表，也就是每个数组单元中存储着一个链表。一旦哈希化出重复的 key，则将数据插入到对应 key 位置存放链表的首端或者末端即可。当查询时，先根据哈希化后的下标值找到对应的位置，再取出链表，线性依次查询数据。

<div style="margin: 10px 0; text-align: center">
<img src="./img/hash_link.png" />
</div>

### 开放地址法

开放地址法的主要工作方式是寻找空白的单元格来添加重复的数据。因此，如何探索空白单元格就成为了开放地址法的关键，目前主要有以下几种方式寻找空白单元格：

#### **线性探测：**

- 存放数据(比如存放 32)：

1、经过哈希化得到的 index=2，但是在插入的时候发现该位置已经有了其他数据了，怎么办呢?

2、线性探测就是从 index 位置+1 开始一点点查找合适的位置来放置 32，直到找到一个空的位置，这个时候 32 就会放在该位置.

- 查询数据(查询 32)：

1、首先经过哈希化得到 index=2，比较 2 的位置结果和查询的数值是否相同,相同那么就直接返回。不相同则线性查找, 从 index 位置+1 开始查找和 32 一样的.

2、这里有一个特别需要注意的地方：如果 32 的位置我们之前没有插入,是否将整个哈希表查询一遍来确定 32 存不存在吗?当然不是,查询过程有一个约定,就是查询到空位置,就停止。因为存放的时候就是线性一个个存放的。

- 删除数据(删除 32)：

删除操作一个数据项时，不可以将这个位置下标的内容设置为 null。为什么呢？因为将它设置为 null 可能会影响我们之后查询其他操作，因为查询是遇到空格就停止，所以通常删除一个位置的数据项时，我们可以将它进行特殊处理(比如设置为-1)。当我们之后看到-1 位置的数据项时，就知道查询时要继续查询，但是插入时这个位置可以放置数据。

- 线性探测的缺点：线性探测有一个比较严重的问题,就是聚集。即如果之前的数据是连续插入的，那么新插入的一个数据可能需要探测很长的距离

比如我在没有任何数据的时候,插入的是 22-23-24-25-26，那么意味着下标值：2-3-4-5-6 的位置都有元素。这种一连串填充单元就叫做聚集。**聚集会影响哈希表的性能,无论是插入/查询/删除都会影响。**比如我们插入一个 32,会发现连续的单元都不允许我们放置数据,并且在这个过程中我们需要探索多次。

#### **二次探测**

二次探测主要优化的是探测时的步长。线性探测的步长为 1。二次探测则对步长做了优化，比如从下标值 x 开始：x+1^2，x+2^2，x+3^2。这样就可以一次性探测比较长的距离,比避免那些聚集带来的影响.

缺点：但是二次探测依然存在问题,比如我们连续插入的是 32-112-82-2-192,那么它们依次累加的时候步长的相同的也就是这种情况下会造成步长不一的一种聚集.还是会影响效率.(当然这种可能性相对于连续的数字会小一些)。

#### 再哈希法

再哈希法的做法就是把关键字用另外一个哈希函数,再做一次哈希化，用这次哈希化的结果作为步长.对于指定的关键字,步长在整个探测中是不变的,不过不同的关键字使用不同的步长.

第二次哈希化需要具备以下特点：

- 与第一个哈希函数不同(不要再使用上一次的哈希函数了，不然结果还是原来的位置)
- 不能输出为 0(否则,将没有步长.每次探测都是原地踏步，算法就进入了死循环)
- 一般选用 stepSize = constant - (key % constant)。constant 为常量，且是小于数组长度的质数。

### 哈希表的效率

在谈及哈希表效率时，我们有必要介绍一下哈希表的装填因子。

装填因子表示当前哈希表中已经包含的数据项和整个哈希表长度的比值。装填因子=总数据项/哈希表长度。

开放地址法的装填因子最大是 1。因为它必须寻找到空白的单元才能将元素放入。链地址法的装填因子可以大于 1，因为拉链法可以无限的延伸下去，只要你愿意.(当然后面效率就变低了)。开放地址法查询时间随装填因子的变大呈指数型增长，而链地址法则呈线性增加。因此，总的来说，链地址法的效率比开放地址法要高很多。

:::tip
当装填因子大于 0.75 时，就要对数组进行扩容；而装填因子小于 0.25 时，就需要对数组进行缩容。
:::

如果没有产生冲突，那么哈希表的效率就会更高。如果发生冲突，存取时间就依赖后来的探测长度。而平均探测长度以及平均存取时间，取决于填装因子，随着填装因子变大，探测长度也越来越长。

:::warning
正如前面介绍的那样，链地址法的装填因子(loadFactor)可以大于 1，因此这种哈希表可以无限制的插入数据。但是，随着数据量的增加，每一个下标所存储的链表/数组的长度会越来越长，从而降低查找效率。所以，需要在合适的情况对数组进行扩容，通常 loadFactor 大于 0.75 就需要进行扩容操作。

扩容之后，所有的数据项一定要同时进行修改(重新调用哈希函数来获取到不同的位置）
:::

### 哈希表的实现

**哈希函数**

```js
/**
 * @description 哈希函数
 * 1、将字符串转换成较大的数字(hashCode)
 * 2、哈希化：将较大的数字hashCode压缩到数组范围内
 * @param {string} 字符串
 * @param {number} 数组范围
 */
function hashFunc(str, size) {
  var hashCode = 0
  // 霍纳算法，常用37作为底数计算hashCode
  for (var i = 0; i < str.length; i++) {
    // string.prototype.charCodeAt(index), 将string[i]转化成对应Unicode编码数字
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }
  // 哈希化
  var index = hashCode % size
  return index
}
```

**哈希表**

思路：哈希表的每个 index 对应的是一个数组(bucket)，bucket 中存放的是 key 和 value，我们继续使用一个数组存储它们。最终我们的哈希表的数据格式是这样: [[ [k,v],[k,v],[k,v] ]，[ [k,v],[k,v] ], [ [k,v] ] ]

<details>
<summary style="margin: 20px 0;color: #4e98bb; cursor: pointer">展开查看实现代码</summary>

```js
function HashTable() {
  this.storage = [] //哈希表
  this.count = 0 //已存放元素个数
  this.limit = 7 // 数组总长度，最好为质数，初始值为7，

  // 哈希函数
  HashTable.prototype.hashFunc = function (str, size) {
    var hashCode = 0
    for (var i = 0; i < str.length; i++) {
      hashCode = hashCode + 37 * str.charCodeAt(i)
    }
    var index = hashCode % size
    return index
  }
  // 增加和修改
  HashTable.prototype.put = function (key, value) {
    // 根据key获取对应的index
    var index = this.hashFunc(key, this.limit)
    // 根据index取出对应的bucket
    var bucket = this.storage[index]
    // 判断该bucket是否有值
    if (!bucket) {
      // 如果没有，则新建一个bucket
      bucket = []
      this.storage[index] = bucket
    }
    // 循环bucket中元素，判断元素的第一项是否等于key，如果相等，则是修改
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value
        return
      }
    }
    // 如果不等，则是增加
    bucket.push([key, value])
    this.count++
    // 是否扩容
    if (this.count > this.limit * 0.75) {
      var newSize = this.getPrime(this.limit * 2)
      this.resize(newSize)
    }
  }
  // 查找
  HashTable.prototype.get = function (key) {
    var index = this.hashFunc(key, this.limit)
    var bucket = this.storage[index]
    if (!bucket) {
      return null
    } else {
      for (var i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1]
        }
      }
      return null
    }
  }
  // 删除
  HashTable.prototype.remove = function (key) {
    var index = this.hashFunc(key, this.limit)
    var bucket = this.storage[index]
    if (!bucket) return null
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(i, 1)
        this.count--
        // 是否缩容
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          var newSize = this.getPrime(Math.floor(this.limit / 2))
          this.resize(newSize)
        }
        return tuple[1]
      }
    }
    return null
  }
  // 扩容/缩容
  HashTable.prototype.resize = function (newLimit) {
    // 保存旧数组中的内容
    var oldStorage = this.storage
    // 重置所有属性
    this.storage = []
    this.count = 0
    this.limit = newLimit
    // 将oldStorage中所有数据重新放置到新的数组中
    for (var i = 0; i < oldStorage.length; i++) {
      var bucket = oldStorage[i]
      if (!bucket) continue
      for (var j = 0; j < bucket.length; j++) {
        var tuple = bucket[j]
        this.put(tuple[0], tuple[1])
      }
    }
  }
  // 判断一个数是否为质数
  HashTable.prototype.isPrime = function (num) {
    // 获取平方根
    var tmp = ParseInt(Math.sqrt(num))
    for (var i = 0; i <= tmp; i++) {
      if (num % i === 0) return false
    }
    return true
  }
  // 获取质数
  HashTable.prototype.getPrime = function (num) {
    while (!this.isPrime(num)) {
      num++
    }
    return num
  }
}
```

</details>

### 哈希表的优缺点

**优点：** 哈希表的插入/删除效率都是非常高的
**缺点：**

1、空间利用率不高,底层使用的是数组,并且某些单元是没有被利用的.

​2、哈希表中的元素是无序的,不能按照固定的顺序来遍历哈希表中的元素.

​3、不能快速的找出哈希表中的最大值或者最小值这些特殊的值.
