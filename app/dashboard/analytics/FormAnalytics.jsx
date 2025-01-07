"use client"

import React, { useEffect, useState } from "react"
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"
import { db } from "@/configs"
import { userResponses } from "@/configs/schema"
import { eq } from "drizzle-orm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function FormAnalyticsPreview({ jsonForm, formRecord }) {
  const router = useRouter()
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [totalResponses, setTotalResponses] = useState(0)
  const [uniqueResponders, setUniqueResponders] = useState(0)
  const [firstResponseDate, setFirstResponseDate] = useState(null)
  const [lastResponseDate, setLastResponseDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trendPercentage, setTrendPercentage] = useState(0)

  useEffect(() => {
    fetchAnalyticsData()
  }, [formRecord.id])

  const fetchAnalyticsData = async () => {
    try {
      // Fetch user responses for the given form
      const responses = await db
        .select()
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id))

      // Total Responses
      setTotalResponses(responses.length)

      // Calculate Unique Responders
      const uniqueUsers = new Set(responses.map((response) => response.userId))
      setUniqueResponders(uniqueUsers.size)

      // Calculate the first response date
      if (responses.length) {
        const firstDate = new Date(Math.min(...responses.map((r) => new Date(r.createdAt))))
        setFirstResponseDate(firstDate)
      }

      // Process Bar Chart Data (Daily Responses)
      const dailyData = {}
      responses.forEach((response) => {
        const day = new Date(response.createdAt).toLocaleDateString()
        dailyData[day] = (dailyData[day] || 0) + 1
      })

      const formattedBarData = Object.keys(dailyData).map((day) => ({
        name: day,
        responses: dailyData[day],
      }))

      setBarData(formattedBarData)

      // Calculate the daily percentage trend
      if (formattedBarData.length > 1) {
        let lastDayResponses = formattedBarData[formattedBarData.length - 2].responses
        let currentDayResponses = formattedBarData[formattedBarData.length - 1].responses

        let percentageChange = ((currentDayResponses - lastDayResponses) / lastDayResponses) * 100
        setTrendPercentage(percentageChange)
      }

      // Process Pie Chart Data (Response Status)
      const statusData = { Completed: 0, "In Progress": 0, Abandoned: 0 }
      responses.forEach((response) => {
        if (response.status in statusData) {
          statusData[response.status]++
        }
      })

      const formattedPieData = Object.keys(statusData).map((status) => ({
        name: status,
        value: statusData[status],
      }))

      setPieData(formattedPieData)

      // Last Response Date
      if (responses.length) {
        const lastDate = new Date(Math.max(...responses.map((r) => new Date(r.createdAt))))
        setLastResponseDate(lastDate)
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const chartConfig = {
    desktop: {
      label: "Responses",
      color: "hsl(var(--chart-1))",
    },
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="bg-white/60 p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">{jsonForm?.formTitle || "Analytics Preview"}</h2>
      <p className="text-gray-600 mb-4">{jsonForm?.formHeading || "Explore your form analytics here"}</p>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalResponses}</div>
              <div className="text-sm text-gray-500">Total Responses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{uniqueResponders}</div>
              <div className="text-sm text-gray-500">Unique Responders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {firstResponseDate ? firstResponseDate.toLocaleDateString() : "N/A"}
              </div>
              <div className="text-sm text-gray-500">First Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {lastResponseDate ? lastResponseDate.toLocaleDateString() : "N/A"}
              </div>
              <div className="text-sm text-gray-500">Last Response</div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="w-full h-64">
            <Card>
              <CardHeader>
                <CardTitle>Daily Responses Analytics</CardTitle>
                <CardDescription>Showing responses from the past days</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      accessibilityLayer
                      data={barData}
                      layout="vertical"
                      margin={{
                        left: -20,
                      }}
                    >
                      <XAxis type="number" dataKey="responses" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)} // Shorten date
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Bar dataKey="responses" fill="var(--color-desktop)" radius={5} />
                    </BarChart>
                  </ChartContainer>
                )}
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                {trendPercentage !== 0 && (
                  <div className="flex gap-2 font-medium leading-none">
                    {trendPercentage > 0 ? (
                      <>
                        Trending up by {trendPercentage.toFixed(2)}% this day{" "}
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </>
                    ) : (
                      <>
                        Trending down by {Math.abs(trendPercentage).toFixed(2)}% this day{" "}
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      </>
                    )}
                  </div>
                )}
                <div className="leading-none text-muted-foreground">
                  Showing total responses for the last days
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
