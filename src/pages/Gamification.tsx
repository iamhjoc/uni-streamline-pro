import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award,
  Medal,
  Crown,
  Flame,
  Users,
  TrendingUp,
  Calendar,
  BookOpen
} from "lucide-react";

const Gamification = () => {
  const [userStats] = useState({
    totalPoints: 2450,
    level: 12,
    currentLevelPoints: 450,
    nextLevelPoints: 500,
    rank: 3,
    streak: 15,
    badges: 8
  });

  const badges = [
    { name: "Perfect Attendance", description: "100% attendance for a month", icon: Calendar, rarity: "gold", points: 100 },
    { name: "Assignment Ace", description: "Submitted 10 assignments on time", icon: BookOpen, rarity: "silver", points: 75 },
    { name: "Early Bird", description: "First to submit 5 assignments", icon: Zap, rarity: "bronze", points: 50 },
    { name: "Study Streak", description: "15 consecutive days of activity", icon: Flame, rarity: "gold", points: 100 },
    { name: "Code Master", description: "Won a coding competition", icon: Trophy, rarity: "platinum", points: 150 },
    { name: "Team Player", description: "Completed 5 group projects", icon: Users, rarity: "silver", points: 75 }
  ];

  const leaderboard = [
    { rank: 1, name: "Priya Patel", points: 3250, badge: "👑", course: "B.Tech CSE" },
    { rank: 2, name: "Amit Kumar", points: 2890, badge: "🥈", course: "MBA Finance" },
    { rank: 3, name: "Rahul Sharma", points: 2450, badge: "🥉", course: "B.Tech CSE", isCurrentUser: true },
    { rank: 4, name: "Sneha Singh", points: 2320, badge: "", course: "M.Tech IT" },
    { rank: 5, name: "Vikash Yadav", points: 2180, badge: "", course: "BCA" }
  ];

  const challenges = [
    { 
      title: "Weekend Warrior", 
      description: "Complete 3 assignments this weekend", 
      progress: 2, 
      total: 3, 
      points: 100,
      deadline: "2 days left",
      difficulty: "Medium"
    },
    { 
      title: "Social Butterfly", 
      description: "Participate in 5 forum discussions", 
      progress: 3, 
      total: 5, 
      points: 75,
      deadline: "5 days left",
      difficulty: "Easy"
    },
    { 
      title: "Code Ninja", 
      description: "Solve 10 coding problems", 
      progress: 7, 
      total: 10, 
      points: 150,
      deadline: "1 week left",
      difficulty: "Hard"
    }
  ];

  const recentAchievements = [
    { title: "Study Streak Milestone", points: 50, time: "2 hours ago", type: "streak" },
    { title: "Assignment Submitted Early", points: 25, time: "1 day ago", type: "assignment" },
    { title: "Quiz Perfect Score", points: 100, time: "3 days ago", type: "quiz" }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'platinum': return 'from-gray-300 to-gray-500';
      case 'gold': return 'from-yellow-300 to-yellow-500';
      case 'silver': return 'from-gray-100 to-gray-300';
      case 'bronze': return 'from-orange-300 to-orange-500';
      default: return 'from-blue-300 to-blue-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gamification Hub</h1>
        <p className="text-muted-foreground">Track your progress, earn rewards, and compete with peers!</p>
      </div>

      {/* User Stats Overview */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-8 h-8" />
            </div>
            <p className="text-2xl font-bold">{userStats.totalPoints}</p>
            <p className="text-primary-foreground/80 text-sm">Total Points</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-2">
              <Star className="w-8 h-8" />
            </div>
            <p className="text-2xl font-bold">{userStats.level}</p>
            <p className="text-primary-foreground/80 text-sm">Level</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-2">
              <Medal className="w-8 h-8" />
            </div>
            <p className="text-2xl font-bold">#{userStats.rank}</p>
            <p className="text-primary-foreground/80 text-sm">Rank</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-2">
              <Flame className="w-8 h-8" />
            </div>
            <p className="text-2xl font-bold">{userStats.streak}</p>
            <p className="text-primary-foreground/80 text-sm">Day Streak</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {userStats.level} Progress</span>
            <span>{userStats.currentLevelPoints}/{userStats.nextLevelPoints} XP</span>
          </div>
          <Progress 
            value={(userStats.currentLevelPoints / userStats.nextLevelPoints) * 100} 
            className="h-3 bg-primary-foreground/20" 
          />
        </div>
      </div>

      <Tabs defaultValue="badges" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <badge.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge className="bg-gradient-accent text-accent-foreground">
                      {badge.rarity}
                    </Badge>
                    <Badge className="bg-gradient-primary text-primary-foreground">
                      {badge.points} pts
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Top Performers This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((student, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      student.isCurrentUser 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border bg-card/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{student.badge}</span>
                        <span className="font-bold text-lg">#{student.rank}</span>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${student.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                          {student.name} {student.isCurrentUser && '(You)'}
                        </h4>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{student.points}</p>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <Card key={index} className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.total}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{challenge.points} points</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{challenge.deadline}</span>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:bg-gradient-accent">
                    Continue Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                        <Award className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-primary text-primary-foreground">
                      +{achievement.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Gamification;