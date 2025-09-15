import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { Card3D } from "@/components/Card3D";
import { TrendingUp, Users } from 'lucide-react';

const performanceData = [
  { semester: 'Sem 1', cgpa: 8.2 },
  { semester: 'Sem 2', cgpa: 8.5 },
  { semester: 'Sem 3', cgpa: 7.9 },
  { semester: 'Sem 4', cgpa: 8.8 },
  { semester: 'Sem 5', cgpa: 9.1 },
];

const attendanceData = [
  { name: 'Present', value: 85, color: 'hsl(var(--success))' },
  { name: 'Absent', value: 15, color: 'hsl(var(--destructive))' },
];

export const StudentCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card3D className="border-0 shadow-card">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon 
                icon={TrendingUp} 
                className="w-5 h-5" 
                glowType="success"
                animationType="float"
                delay={100}
              />
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="semester" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="cgpa" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Card3D>

      <Card3D className="border-0 shadow-card">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AnimatedIcon 
                icon={Users} 
                className="w-5 h-5" 
                glowType="primary"
                animationType="pulse"
                delay={300}
              />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Card3D>
    </div>
  );
};