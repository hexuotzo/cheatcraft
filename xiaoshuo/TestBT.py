class BtTest(unittest.TestCase):
    '''duel Qingfeng Beelzebub'''
    def test_fighting(self):
        paopao=Player(mhp=617,hp=600,mov=2,atk=500,defend=150,exp=0,name='pp')   
        fattan=Player(mhp=1000,hp=1000,mov=1,atk=300,defend=300,exp=0,name='mactan') 
        furong=Player(mhp=888,hp=888,mov=1,atk=480,defend=160,exp=80,name='Mr.FR')   
        yanrujia=Enemy(mhp=49820,hp=49820,mov=4,atk=500,defend=188,name='Qingfeng_Beelzebub',side="enemy")
        tmap=Map([[paopao,fattan,furong,0,0],    
                      [0,0,0,0,0],                 
                      [0,0,0,0,0],               
                      [0,0,0,0,0],                    
                      [0,0,0,0,yanrujia]])              
        tiejian = Equipment(atk=150,defend=50,name = 'sword')  
        tiefu = Equipment(atk=200,name='ax')               
        tieqiang = Equipment(atk=300,defend=100,name='gun')  
        testSword = Equipment(atk=10000,name='gm_sword')  #测试用剑
        frostmourne  = Equipment(atk=1000,defend=100,lv=10,name='Frostmourne ') 
        use_item=[]   
        red=Item(hp=200)               
        for i in range (50):
            use_item.append(red)
        tmap.missionStart()           #游戏开
        self.assertEqual(yanrujia.position,(4,4))
        tmap.mapRoundStart(flug='hero')
        tmap.fly(paopao,1,0)
        paopao.equip(testSword)
        self.assertEqual(paopao.newAtk,10500)
        fattan.equip(tieqiang)
        self.assertEqual(fattan.newDefend,400)
        self.assertEqual(furong.equip(dragonSword),False) 
        self.assertEqual(furong.newAtk,480)        
        furong.equip(tiefu)   
        self.assertEqual(furong.newAtk,680)    
        self.assertEqual(tmap.fly(paopao,2,0),False)    
        tmap.mapRoundStart(flug="enemy")     
        tmap.fly(yanrujia,2,2)                
        self.assertEqual(tmap.getPosition(yanrujia),(2,2)) 
        tmap.mapRoundStart(flug='hero')   
        tmap.fly(furong,1,2) 
        self.assertEqual(furong.attack(yanrujia,0),(49820-680+188,False)) 
        self.assertEqual(furong.exp,100)    
        self.assertEqual(furong.heroLV,2)    
        self.assertEqual(paopao.attack(yanrujia),False)  
        paopao.equip(tiejian)  
        paopao.leftEquip(testSword)  
        self.assertEqual(paopao.newAtk,650) 
        fattan.useItem(red)             
        self.assertEqual(fattan.hp,1000)  
        tmap.mapRoundStart(flug='enemy') 
        tmap.fly(yanrujia,1,1)            
        yanrujia.attack(fattan,0)       
        self.assertEqual(fattan.hp,800)   
        self.assertEqual(fattan.mhp,1000) 
        self.assertEqual(fattan.attack(yanrujia),False)
        c=0                                           
        for i in range(0,1000):  
            tmap.mapRoundStart()  
            hp,b=fattan.attack(yanrujia)
            if b:
                self.assertNotEqual(yanrujia.hp,48916)
                c=c+1
            else:
                self.assertEqual(yanrujia.hp<=48916,True)
            yanrujia.hp=49328
        print c
        self.assertEqual(c>=30,True)
        self.assertEqual(c<=70,True)
        self.assertEqual(fattan.equip(dragonSword),True)
        for i in range(0,40):  
            tmap.mapRoundStart()
            fattan.attack(yanrujia)
            furong.attack(yanrujia)
        self.assertEqual(yanrujia.isOver(),True)
        print 'mission complete'
        
class MapTest(unittest.TestCase):
    def setUp(self):
        self.ppl=Player(mhp=10,hp=10)
        self.enemy=Enemy(mhp=8,hp=8)
        self.newmap=Map([[0,0,0,self.ppl],
                    [0,0,0,0],
                    [0,0,0,0],
                    [self.enemy,0,0,0]])
    def test_Fly(self):
        print (self.newmap.getPosition(self.ppl))
        print 'Fly_Start'
        self.newmap.missionStart()
        self.newmap.mapRoundStart(flug='hero')
        self.assertEqual(self.newmap.fly(self.ppl,2,3),(2,3))
        print 'Hero Flew Over'
        print '#### Waiting For Enemy   ####'
        print '#### Enemy Start !!!     ####'
        self.assertEqual(self.newmap.fly(self.enemy,3,1),(False))
        print '###  Enemy Flew Over!!   ####'
        self.newmap.mapRoundStart(flug='enemy')
        print (self.newmap.getPosition(self.enemy))
        print (self.newmap.getPosition(self.ppl))

class Human(object):
    '''human is warrior'''
    def __init__(self,mhp,hp,mov=2,atk=10,defend=5,
                    exp=0,int=0,money=1000,name=None,side = "hero"):
        self.mhp=mhp   # max HP
        self.hp=hp
        self.mov=mov   # your move
        self.atk=atk  # your atk
        self.defend=defend  
        self.int=int
        self.atk_add = 0 
        self.exp = exp 
        self.name = name
        self.position=(0,0)
        self.money = money 
        self.mybag = [] 
        self.myEquip = {}  
        self.newAtk=self.atk
        self.newDefend=self.defend
        self.side = side
        self.state= "Unable"
    def useItem(self,item):
        if self.mround>=0:
            self.hp += item.hp
            self.atk += item.atk
            self.mov += item.mov
            self.defend += item.defend
            self.mround = self.mround - 3
            if self.hp>self.mhp:self.hp=self.mhp
    def getLevel(self):
        '''get user level'''
        return self.exp/100+1
    heroLV = property(getLevel)
    def equip(self,equipment):
        if equipment.owner == None and self.heroLV>=equipment.lv:
            self.myEquip[id(equipment)] = equipment
            self.newAtk += equipment.atk
            self.newDefend += equipment.defend
            equipment.owner = self
            return True
        return False
    def equipBag(self,bag):
        if bag.owner == None:
            bag.owner = self
            self.mybag = bag
            return True
        return False
    def leftEquip(self,equipment):
        if id(equipment) in self.myEquip:
            self.newAtk -= equipment.atk
            self.newDefend -= equipment.defend
            equipment.owner = None
            self.mybag.append(equipment)
            del self.myEquip[id(equipment)]
            return True
        return False
    def useItem(self,item):
        if self.state== "Enable" or self.state=="Operable":
            self.hp += item.hp
            self.atk += item.atk
            self.mov += item.mov
            self.defend += item.defend
            self.state = "Unable"
            if self.hp>self.mhp:self.hp=self.mhp
            del item
    def atkRound(self,target,distance=1):
        a,b=self.position
        c,d=target.position
        if abs(a-c)+abs(b-d)<=distance:
            return True
        return False
    def attack(self,target,bang=5):
        '''计算产生何种攻击方式'''
        if self.atkRound(target) and self.state=="Enable" or self.state=="Operable":
            roll=random.randint(1,1000)
            if bang==1:
                self.atk_add = int(self.newAtk*0.5)
                return self.realAttack(target)   
            elif bang==0:
                self.atk_add = 0
                return self.realAttack(target)
            elif roll>51 and bang==5:
                self.atk_add = 0
                return self.realAttack(target)
            elif roll<=51 and bang==5:
                self.atk_add = int(self.newAtk*0.5)
                return self.realAttack(target)       
        return False
    def realAttack(self,target):
        '''atk your enemy'''
        damage=self.newAtk+self.atk_add-target.defend
        target.hp=target.hp-damage
        skill = Skill(self,target) #exp
        self.state="Unable"
        if self.atk_add==0:
            return target.hp,False
        return target.hp,True
    def magicAttack(self,target):
        damage=self.int-target.defend
        target.hp=target.hp-damage
        skill=Skill(self,target)
        self.state="Unable"
    def isOver(self):
        '''judge dead'''
        print 'HP:' ,self.hp
        if self.hp<=0:
            print 'you dead'
            return True
        return False
class Seller(type):
    '''saler metaclass'''
    def __new__(cls,classname,bases,classdict):
        def checkLegal(self,ppl,x):
            if ppl.money > x.price: 
                if ppl.mybag.baglimited():
                    return True
                print 'your bag is FULL !'
            print 'you need more money'
            return False
        def buy(self,ppl,x):
            if checkLegal():
                ppl.mybag.addItem(x)
                ppl.money = ppl.money - x.price
                return True
            return False
        def sell(self,ppl,x):
            if ppl.mybag.baglimited():
                ppl.money = ppl.money + (x.price)/2
                del x
        newdict={"checkLegal":checkLegal,"buy":buy,"sell":sell}
        newdict.update(classdict)
        return type.__new__(cls,classname,bases,newdict)
class Mage(type):
    '''冰火法师的元类'''
    def __new__(cls,classname,bases,classdict):
        def __init__(self,mhp,hp,mov=2,atk=5,int=15,defend=5,
                     mdefend=10,exp=0,money=1000,name='Mage'):  
            self.mhp=mhp
            self.hp=hp
            self.mov=mov
            self.atk=atk   
            self.int=int  
            self.defend=defend
            self.atk_add=0
            self.exp=exp
            self.name=name
            self.mround=0
            self.position=(0,0)
            self.money=money
            self.mybag=[]
            self.myEquip={}
            self.newAtk=self.atk
            self.newDefend=self.defend
        def fireBall(self,target):
            if self.atkRound(target,distance=2) and self.state=="Enable" or self.state=="Operable":
                self.magicAttack(target)
class Warrior(type):
    '''warrior job metaclass'''
    def __new__(cls,classname,bases,classdict):
        def comboAttack(self,target):
            if self.atkRound(target) and self.state=="Enable" or self.state=="Operable":
                for i in range(0,2):    
                    roll=random.randint(1,1000)
                    if roll>51:
                        self.atk_add = 0
                        self.realAttack(target)
                    elif roll<=51:
                        self.atk_add = int(self.newAtk*0.5)
                        self.realAttack(target)
                return True
            return False
        newdict={"comboAttack":comboAttack}
        newdict.update(classdict)
        return type.__new__(cls,classname,bases,newdict)
        
class Priest(type):
    '''priest job metaclass'''
    def __new__ (cls,classname,bases,classdict):
        def fastTreatment (self,target):
            if self.atkRound(target,distance=2) and self.state=="Enable" or self.state=="Operable":
                target.hp += int(target.mhp/2)
                self.state="Unable"
                if target.hp>target.mhp:target.hp=target.mhp
                return True
            return False
        def powerTreatment (self,target):
            if self.atkRound(target) and self.state=="Enable" or self.state=="Operable":
                target.hp = target.mhp
                self.state="Unable"
                return True
            return False
        def farTreatment (self,target):
            if self.atkRound(target,distance=10) and self.state=="Enable" or self.state=="Operable":
                target.hp += int(target.mhp/4)
                self.state="Unable"
                if target.hp>target.mhp:target.hp=target.mhp
                return True
            return False  
        newdict={"fastTreatment":fastTreatment,"powerTreatment":powerTreatment,"farTreatment":farTreatment}
        newdict.update(classdict)
        return type.__new__(cls,classname,bases,newdict)
        
class Hunter(type):
    def __new__(cls,classname,bases,classdict):
        def shoot (self,target):  
            if self.atkRound(target,distance=2) and self.state=="Enable" or self.state=="Operable":
                roll=random.randint(1,1000)
                if roll>51:
                    self.atk_add = 0
                    self.realAttack(target)
                elif roll<=51:
                    self.atk_add = int(self.newAtk*0.5)
                    self.realAttack(target)
                return True
            return False
        def farShoot (self,target): 
            if self.atkRound(target,distance=6) and self.state=="Enable" or self.state=="Operable":
                roll=random.randint(1,100)
                if roll>40:
                    self.atk_add = 0
                    self.realAttack(target)
                elif roll<=40:
                    self.state = "Unable"
                return True
            return False
        newdict={"shoot":shoot,"farShoot":farShoot}
        newdict.update(classdict)
        return type.__new__(cls,classname,bases,newdict)
                         
class Factory(object):
    @staticmethod
    def new(career,**args):
        return career(str(career),(Human,),{})(**args)
    #def newtype(cls,career,*args):
    #    return career(str(career),(type,),{})
        
class Player(Human):
    '''default warrior'''
    __metaclass__= Warrior
class Enemy(Human):
    __metaclass__= Warrior

if __name__ == '__main__':
    unittest.main()
