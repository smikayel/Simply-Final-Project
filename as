[33mcommit f3bbe860cc537c436a01bbfc3e9d4de3c98f5548[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sat Jul 2 21:50:43 2022 +0400

    add swagger docs for auth and groups routes

[33mcommit a74295453b39e3309a1c27e91c3de4af3cd1db49[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sat Jul 2 17:10:48 2022 +0400

    add topUsers route

[33mcommit bdad6b464cdf34c11ab06ea24766e87a483c9395[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sat Jul 2 15:09:37 2022 +0400

    setip swagger documentation

[33mcommit 1a973788432ea5333fdd1a063ab6aa99568c2cbe[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Fri Jul 1 14:42:02 2022 +0400

    filter users by firstName in getAllUsers

[33mcommit e81d20f45b33d534d7060ed7584e76f4ccefdb70[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Fri Jul 1 13:56:01 2022 +0400

    delete schedules before creating if exists

[33mcommit c1beb31b2c40e307aa4f95c914920773a69cd2cc[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Fri Jul 1 13:30:32 2022 +0400

    fix delete many for users and groups. show user messages even if user has been deleted

[33mcommit 87f7a9f94e783ba71134234845e2f2fa5355971f[m
Merge: c40f25c 4fc1572
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Thu Jun 30 20:35:37 2022 +0400

    Merge branch 'main' of https://github.com/smikayel/Simply-Final-Project

[33mcommit c40f25ce1b31401c5368fd5c479a200ba51511a5[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Thu Jun 30 20:35:10 2022 +0400

    add cascades to prisma scheme. do not send group messages to user unless he is that groups member or is admin

[33mcommit 4fc1572d1135306c35fc983df66eb309823a283c[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Thu Jun 30 19:42:07 2022 +0400

    bag fix

[33mcommit 4d3755d6df5f9e737331b0ff3967fcb320c61a29[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Thu Jun 30 13:54:16 2022 +0400

    create recieve_group_messages event

[33mcommit 5380e4a6bcd8315abd30cc7b5e0114f85df21f2d[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Wed Jun 29 22:46:38 2022 +0400

    corected user create and group creat part

[33mcommit d21809925dc7ec4e0b32ad09cd234e271890a901[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 20:34:20 2022 +0400

    store messages in database

[33mcommit cbf527228bd4d55e831c732b128d01ecc39c56ca[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 20:32:26 2022 +0400

    add route for getting group messages

[33mcommit c3e8da30ae93049667f05b142e4362c44c0757b8[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 16:14:14 2022 +0400

    send messages only to group users. do not store messages in database for now

[33mcommit 3ad721e81898b61b915fd76a2450723cd528bacb[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 14:04:01 2022 +0400

    include user id in getGroupUsers

[33mcommit 9685e57dd71d805b904ccb69a6b6f172a03b4352[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 13:52:00 2022 +0400

    fix prisma schema

[33mcommit d7ced5a26f7384256593b11f287b1e8f9eabdb86[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 13:51:13 2022 +0400

    create chat schema in db. add create message and get messages for group

[33mcommit 1b51eb15ec2df08ac4682cb4fe04c042635a5726[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Wed Jun 29 12:55:15 2022 +0400

    add route for getting groups users by group id

[33mcommit bb630c0a01457e778ca7209cdb6b5d938c205984[m
Author: Davit-Avakian <davitavakian05@gmail.com>
Date:   Tue Jun 28 14:04:34 2022 +0400

    add socket.io join

[33mcommit ea48ed0b7fa53a9f7041e8c90911075e1e8c8312[m
Author: Davit-Avakian <davitavakian05@gmail.com>
Date:   Tue Jun 28 13:13:45 2022 +0400

    Chat socket io setup

[33mcommit b828dd7e0215cfe8d79c2a0f2ea90f3d1ac1c4bc[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Mon Jun 27 21:21:08 2022 +0400

    change test answer results format

[33mcommit 5fcffbfcfd217bdf36342140c6b9028ddfdd895b[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sun Jun 26 19:02:55 2022 +0400

    make tests accessible for student after it expires

[33mcommit 15b67c51984bad09fe47123f0e6c1cfc8c5526da[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sun Jun 26 16:12:37 2022 +0400

    filter userTests by subject

[33mcommit b18dbf80e54c19e751e4ab38d35857bdfac2cca3[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sat Jun 25 20:40:07 2022 +0400

    set isComplete status to true and mark to 0 automatically when test expires and user hasn't submitted yet. delete groupTest row on test delete. add validations for some routes in test. create constants for access token expire time and others in modules/constants.js file

[33mcommit c03f4d37f00b55be5d46cb732508eff6789a21ac[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Sat Jun 25 16:27:17 2022 +0400

    fix validations for createTest

[33mcommit 2e8fb055e65503260fd4f51469cc6db0eae50d6a[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Fri Jun 24 17:59:02 2022 +0400

    create getTestResults route. do not include non completed tests in average mark calculations. filter getUserTests based on query params such as isComplete and take skip for pagination

[33mcommit eac7c82c02875557cfbf6ac5e13afa88367a0a79[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:59:10 2022 +0400

    changed user create service

[33mcommit 45fb09dea6ae8559bf13ba1933b474ef94ff41e7[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:45:42 2022 +0400

    fix getting params from body

[33mcommit d25391ed7754a190ed2d56726c0560c064df1a24[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:38:31 2022 +0400

    delete console logs

[33mcommit 2b4572228a2a7bd8e163a84185aab8ae3b3824d7[m
Merge: ec8947a 8b1d78f
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:36:53 2022 +0400

    Merge branch 'main' of https://github.com/smikayel/Simply-Final-Project

[33mcommit ec8947adc2e34c5cc4c5504f4dbe2b42961ec3f5[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:35:04 2022 +0400

    delete all console.logs witch is not needed

[33mcommit 8b1d78f94c30a1cc2a4e94cc84db63c2484eb419[m
Merge: b5a0575 2372405
Author: Sasha Mikayelyan <80779485+smikayel@users.noreply.github.com>
Date:   Tue Jun 21 20:26:17 2022 +0400

    Merge pull request #17 from smikayel/hov
    
    changes subjects rout validation and request part

[33mcommit b5a057550bfc3034142dfda0e239804703248546[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:21:44 2022 +0400

    Role not found error status changed from 402

[33mcommit 23724057bf6bbfc34b4fbfeb9f291b9fe716d8b7[m
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Tue Jun 21 20:21:27 2022 +0400

    get testId from body in testSubmit

[33mcommit 1a61972877eb6bf8c138777c1125c3fcdd69c617[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 20:11:31 2022 +0400

    add usertest part in /tests/userAll request

[33mcommit 8585c6524cf9a94fa2e5b214e08a66590d8940b5[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 19:56:29 2022 +0400

    add usertest part in /tests/userAll request

[33mcommit 46fd84c2f478cb01bf74b03a9490c22af1a15f8c[m
Merge: 2ca849b 02405d8
Author: Hov1122 <avanyanhovhannes@gmail.com>
Date:   Tue Jun 21 18:35:32 2022 +0400

    Merge branch 'main' into hov

[33mcommit 02405d87ec85487d061f5c6170bb4330366b36b8[m
Author: smikayel <sasha-mikayelyan@mail.ru>
Date:   Tue Jun 21 15:16:05 2022 +0400

    send mail to user

[33mcommit c6a86009f9e05a1e408614406c348fccb2cbc236[m
Author: Sasha-rgb <keramika578@mail.ru>
Date:   Sun Jun 19 16:44:58 2022 -0400

    add notification sender, not finished yet

[33mcommit 79bbbbeac1a8d91324ce8492076e7a74e47cfaa6[m
Author: Sasha-rgb <keramika578@mail.ru>
Date:   Sun Jun 19 06:53:52 2022 -0400

    add create test, connect it with group , connect with group user, and prisma add the GroupTest model, relation w