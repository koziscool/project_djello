# assignment_djello - JOHN and DEEPA
Project management with that great wobbly taste.

Card should be created only by board owner?

User
====
devise stuff


Boards
======
 id       : integer
 name     : string
 user_id  : integer   --> foregign reference (belongs to a user)

Lists
=====
id         : integer
board_id   : integer
title      : string 
description: string

Cards
=====
id          : integer
title       : string
Description : string
completed      : boolean ? (false for not completed , true for completed)
compelete_date : date
list_id     : integer --> belongs to list
priority    : integer 


CardMembers 
===========
id      : integer
card_id : integer
user_id : ineteger (name this member_id?)

Associations
============

1. User has_many boards
   User has_many cards through card_members
   User has_many lists through boards

2.  Board belongs_to User
    Board has_many lists
    Board has_many cards through cards

3.  List belongs_to board
    List has_many cards
    List has_one user (owner) through board

4. Card belongs_to one list
   Card has_many members (users) though card_members
   Card has_one board through list
  
5. Card Member belongs user (foreign user_id)
   Card Member belongs to card (foreign id card_id)   


Validations:
=============
user_id / card_id / list_id / board_id cannot be null anywhere
user_id / card_id / list_id / board_id exist in their primary table

title for board, card and list cannot be blank 
description for card cannot be blank

priority for card is unique within a list ?

Card  - completed starts as false
Can be changed from false to true 
Compeleted date is auto populated 

Cannot delete user

Only board owner can create / delete list or card for the board? 

Delete a board --> deletes all its lists and cards and card_members
Delete a list  --> deletes all its cards and card_members
Delete a card  --> deletes all its card_members  

Views
======
 Main Layout <ui-view>
   Board View <ui-view> 
     Multiple List <ui-view> - nested under board
      Multiple cards 

Actions
=======
 1. User create seed 
 2. Do devise authetication (Rails only)
 3. Board Create
     Board Controller
       loading a board should get all its lists and cards and card members



