import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Search,
  Users,
  Ticket as TicketIcon,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { useStudentsStore } from '@/stores/students-store'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search as CommandSearch } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { RiskBadge, TicketStatusBadge } from './components/risk-badge'
import { necesidades } from './data/data'
import type { RiskLevel } from './data/schema'
import { calcularScore } from './lib/score'

export function StudentsDashboard() {
  const navigate = useNavigate()
  const students = useStudentsStore((s) => s.students)
  const tickets = useStudentsStore((s) => s.tickets)

  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'todos'>('todos')
  const [needFilter, setNeedFilter] = useState<string>('todos')

  const conScore = useMemo(
    () => students.map((s) => ({ student: s, score: calcularScore(s) })),
    [students]
  )

  const filtered = useMemo(() => {
    return conScore.filter(({ student: s, score }) => {
      const matchesSearch =
        search.trim() === '' ||
        s.nombre.toLowerCase().includes(search.toLowerCase()) ||
        s.legajo.includes(search)
      const matchesRisk = riskFilter === 'todos' || score.nivel === riskFilter
      const matchesNeed =
        needFilter === 'todos' ||
        s.autopercepcion.necesidadPrincipal === needFilter
      return matchesSearch && matchesRisk && matchesNeed
    })
  }, [conScore, search, riskFilter, needFilter])

  const riskAlto = conScore.filter(({ score }) => score.nivel === 'alto').length
  const ticketsAbiertos = students.filter(
    (s) => s.estadoTicket !== 'resuelto'
  ).length
  const casosResueltos = students.filter(
    (s) => s.estadoTicket === 'resuelto'
  ).length

  return (
    <>
      <Header>
        <CommandSearch />
        <div className='ms-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Detección y Alerta Temprana
            </h1>
            <p className='text-muted-foreground'>
              Monitoreo y asignación de mentores para mitigar deserción
              académica.
            </p>
          </div>
        </div>

        <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <SummaryCard
            label='RIESGO ALTO'
            value={riskAlto}
            sub={`de ${students.length} monitoreados`}
            icon={AlertTriangle}
            valueClass='text-red-600 dark:text-red-500'
          />
          <SummaryCard
            label='TOTAL MONITOREADOS'
            value={students.length}
            sub='Cohorte actual'
            icon={Users}
          />
          <SummaryCard
            label='TICKETS ABIERTOS'
            value={ticketsAbiertos}
            sub={`${tickets.length} creados en total`}
            icon={TicketIcon}
          />
          <SummaryCard
            label='CASOS RESUELTOS'
            value={casosResueltos}
            sub='Este semestre'
            icon={CheckCircle2}
          />
        </div>

        <Card className='mb-4'>
          <CardContent className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center'>
            <div className='relative flex-1'>
              <Search className='absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar alumno, ID...'
                className='pl-8'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              value={riskFilter}
              onValueChange={(v) => setRiskFilter(v as RiskLevel | 'todos')}
            >
              <SelectTrigger className='w-full sm:w-44'>
                <SelectValue placeholder='Riesgo: Todos' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='todos'>Riesgo: Todos</SelectItem>
                <SelectItem value='alto'>Alto</SelectItem>
                <SelectItem value='medio'>Medio</SelectItem>
                <SelectItem value='bajo'>Bajo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={needFilter} onValueChange={setNeedFilter}>
              <SelectTrigger className='w-full sm:w-56'>
                <SelectValue placeholder='Necesidad declarada' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='todos'>Necesidad: Todas</SelectItem>
                {necesidades.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Nivel de riesgo</TableHead>
                  <TableHead>Asistencia</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead>Necesidad declarada</TableHead>
                  <TableHead>Estado ticket</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(({ student: s, score }) => (
                  <TableRow
                    key={s.id}
                    className='cursor-pointer'
                    onClick={() =>
                      navigate({
                        to: '/students/$studentId',
                        params: { studentId: s.id },
                      })
                    }
                  >
                    <TableCell>
                      <div className='font-medium'>{s.nombre}</div>
                      <div className='text-xs text-muted-foreground'>
                        ID: {s.legajo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <RiskBadge risk={score.nivel} />
                    </TableCell>
                    <TableCell
                      className={
                        s.asistencia < 70
                          ? 'font-medium text-red-600 dark:text-red-500'
                          : ''
                      }
                    >
                      {s.asistencia}%
                    </TableCell>
                    <TableCell>
                      hace {s.ultimoAccesoCampusDias}{' '}
                      {s.ultimoAccesoCampusDias === 1 ? 'día' : 'días'}
                    </TableCell>
                    <TableCell>{s.autopercepcion.necesidadPrincipal}</TableCell>
                    <TableCell>
                      <TicketStatusBadge status={s.estadoTicket} />
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='py-8 text-center text-muted-foreground'
                    >
                      No se encontraron estudiantes con esos filtros.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className='mt-3 text-sm text-muted-foreground'>
          Mostrando {filtered.length} de {students.length} estudiantes
        </p>
      </Main>
    </>
  )
}

function SummaryCard({
  label,
  value,
  sub,
  icon: Icon,
  valueClass,
}: {
  label: string
  value: number
  sub: string
  icon: React.ElementType
  valueClass?: string
}) {
  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between text-xs font-medium tracking-wide text-muted-foreground'>
          {label}
          <Icon className='h-4 w-4' />
        </div>
        <div className={`mt-1 text-2xl font-bold ${valueClass ?? ''}`}>
          {value}
        </div>
        <div className='text-xs text-muted-foreground'>{sub}</div>
      </CardContent>
    </Card>
  )
}
