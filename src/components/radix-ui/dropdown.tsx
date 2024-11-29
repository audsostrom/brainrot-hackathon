import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

interface DropdownProps {
  items: string[];  // List of items for the dropdown
  onSelect: (item: string) => void;  // Callback when an item is selected
  label: string | ReactNode;  // Optional label to display on the dropdown trigger button
}

const Dropdown = ({ items, onSelect, label }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="text-grey-400 hover:text-white focus:outline-none">
        {label}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="w-48 p-2 bg-primary border border-gray-300 rounded-lg shadow-lg z-10"
        align="start"
      >
        {items.map((item) => (
          <DropdownMenu.Item
            key={item}
            className="px-4 py-2 text-foreground hover:bg-secondary cursor-pointer"
            onSelect={() => onSelect(item)}
          >
            {item}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
