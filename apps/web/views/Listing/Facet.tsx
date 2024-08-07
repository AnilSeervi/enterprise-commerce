import { AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion/Accordion"
import { Checkbox } from "components/Checkbox/Checkbox"
import { Label } from "components/Label/Label"

interface FacetProps {
  id: string
  title: string
  distribution: Record<string, number> | undefined
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
}

export function Facet({ id, title, distribution, isChecked, onCheckedChange }: FacetProps) {
  const distributionsEntries = Object.entries(distribution || {})

  const hasNoResults = distributionsEntries.length === 0

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="text-base">{title}</AccordionTrigger>
      <AccordionContent>
        {hasNoResults ? (
          <p className="text-[14px] text-neutral-500">No {title.toLowerCase()} found</p>
        ) : (
          <div className="grid max-h-[300px] gap-2 overflow-auto">
            {distributionsEntries.map(([value, noOfItems], index) => (
              <Label key={value + index} className="flex items-center gap-2 font-normal">
                <Checkbox name={value} checked={isChecked(value)} onCheckedChange={(checked) => onCheckedChange(!!checked, value)} />
                {value} ({noOfItems} items)
              </Label>
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
