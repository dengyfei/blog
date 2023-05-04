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
