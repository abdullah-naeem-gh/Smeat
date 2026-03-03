import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const chartData = [
  { x: 0, smeat: 157, control: 105, clean: 90 },
  { x: 200, smeat: 151, control: 128, clean: 91 },
  { x: 400, smeat: 144, control: 128, clean: 93 },
  { x: 600, smeat: 140, control: 128, clean: 93 },
  { x: 800, smeat: 135, control: 128, clean: 92 },
  { x: 1000, smeat: 133, control: 127, clean: 91 },
  { x: 1200, smeat: 133, control: 127, clean: 94 },
]

const DataSection = () => {
  return (
    <section id="data-section" className="h-screen bg-gray-50 overflow-hidden font-montserrat flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
          
          {/* Left: Content — single heading only */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-lg">
              Coated samples exhibit a 60-70% reduction in pollutants within a single day of exposure.
            </h2>
          </div>

          {/* Right: Exposure Chamber Line Chart */}
          <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="mb-2">
              <h4 className="text-base font-bold text-gray-800 uppercase tracking-wider">
                SMEAT Exposure Chamber Reduction
              </h4>
              <p className="text-sm text-gray-500 mt-1">AQI baseline vs. treated environment</p>
            </div>

            <div className="h-[280px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="smeatFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="x"
                    tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: '#94a3b8' }}
                    tickMargin={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[80, 180]}
                    tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: '#94a3b8' }}
                    tickMargin={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: 8,
                      padding: 12,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                    }}
                    labelStyle={{ color: '#e2e8f0' }}
                    itemStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number | undefined) => [value ?? '', '']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: 20 }}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => <span className="text-gray-700 font-medium text-sm">{value}</span>}
                  />
                  <Area
                    type="monotone"
                    dataKey="smeat"
                    name="SMEAT Exposure Chamber"
                    fill="url(#smeatFill)"
                    stroke="transparent"
                    legendType="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="smeat"
                    name="SMEAT Exposure Chamber"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#ffffff', stroke: '#059669', strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: '#ffffff', stroke: '#059669', strokeWidth: 2 }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="control"
                    name="Control Chamber"
                    stroke="#f97316"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 4 }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="clean"
                    name="Clean Air Baseline"
                    stroke="#3b82f6"
                    strokeWidth={1}
                    dot={false}
                    activeDot={{ r: 4 }}
                    connectNulls
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-6 text-xs text-gray-400 font-medium italic text-center">
              *Data based on controlled exposure chamber tests with NOx and VOC concentrations.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DataSection
